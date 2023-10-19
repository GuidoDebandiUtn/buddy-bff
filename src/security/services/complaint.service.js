import { sequelize } from "../../database/database.js";
import { publicationDelete } from "../../lost-adoption/services/publication.service.js";
import { Complaint } from "../../models/Complaint.js";
import { PublicationAdoption } from "../../models/PublicationAdoption.js";
import { PublicationSearch } from "../../models/PublicationSearch.js";
import { Service } from "../../models/Service.js";
import { createNotificationForPermission, createNotificationForUser } from "../../reports/service/notifications.services.js";
import { deleteService, getServiceById } from "../../services/services/service.service.js";
import { changeStateUser } from "./stateUser.service.js";
import { getStateForUser, updateUser } from "./user.service.js";
import { getUserStateByName } from "./userState.service.js";


export async function createComplaint(data, idComplainant) {
  const { category, complaintDescription, idUserReported, idReference } = data;
  let referenceAtribute;

  switch (category) {
    case 'SEARCH':
      referenceAtribute = 'idPublicationSearch';
      break;
    case 'ADOPTION':
      referenceAtribute = 'idPublicationAdoption';
      break;
    case 'SERVICE':
      referenceAtribute = 'idService';
      break;
  }


  try {
    const newComplaintData = {
      category,
      complaintDescription,
      idUserReported,
      idUserReporting: idComplainant,
    };

    newComplaintData[referenceAtribute] = idReference;

    const newComplaint = await Complaint.create(newComplaintData);

    try{
      await createNotificationForPermission('READ_DENUNCIAS',`Se ha creado una nueva denuncia, referencia: ${referenceAtribute}: ${idReference}`);
    }catch(error){
      console.log("error creando notificacion para un los usuarios moderadores de una nueva denuncia: ",error);
    }

    return newComplaint;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllComplaints(page = 1, recordsPerPage = 10) {
  try {
    let include = [
      { model: PublicationSearch, attributes: ['idPublicationSearch', 'title', 'isFound', 'lostDate', 'createdAt', 'idUser'] },
      { model: PublicationAdoption, attributes: ['idPublicationAdoption', 'title', 'createdAt', 'contactPhone', 'idUser'] },
      { model: Service, attributes: ['idService', 'serviceTitle', 'avgRating', 'address', 'createdAt', 'idUser'] },
    ];
    let attributes = ['idComplaint', 'idUserReporting', 'idUserReported', 'complaintDescription', 'category', 'active', 'verified', 'createdAt', 'updatedAt'];
    const offset = (parseInt(page, 10) - 1) * recordsPerPage;
    const limit = parseInt(recordsPerPage, 10);
    const order = [['createdAt', 'DESC']];
    const where = { active: 1, verified: 0 };


    const complaints = await Complaint.findAll({ offset, limit, order, attributes, include, where });
    const transformedComplaints = complaints.map(complaint => {
      let publication = null;
    
      if (complaint.publicationSearch) {
        complaint.dataValues.category = "Búsqueda de Mascota";
        publication = { ...complaint.publicationSearch.dataValues };
        delete complaint.dataValues.publicationSearch;
      } else if (complaint.publicationAdoption) {
        complaint.dataValues.category = "Adopción de Mascota";
        publication = { ...complaint.publicationAdoption.dataValues };
        delete complaint.dataValues.publicationAdoption;
      } else if (complaint.service) {
        complaint.dataValues.category = "Servicio";
        publication = { ...complaint.service.dataValues };
        delete complaint.dataValues.service;
      }
    
      return { ...complaint.toJSON(), publication };
    });
    
    return transformedComplaints;
    
  } catch (error) {
    throw error;
  }
}


export async function aproveComplaint(validateComplaintDto) {
  const complaint = validateComplaintDto.complaint;

  await validateComplaint(complaint.idComplaint);

  console.debug("valor de denuncia: ",complaint);

  try {
    switch (complaint.category) {
      case 'SERVICE':
        const service = await getServiceById(complaint.idService);
        await deleteService(service[0]);
        try{
          await createNotificationForUser(complaint.idUserReported,
            `Se ha eliminado tu servicio por que no cumple con nuestros terminos y condiciones.`);
        }catch(error){
          console.log("error creando notificacion para un servicio eliminado por denuncias: ",error);
        }
        break;
      case 'SEARCH':
        await publicationDelete(complaint.idPublicationSearch, 'SEARCH');
        try{
          await createNotificationForUser(complaint.idUserReported,
            `Se ha eliminado tu Busqueda por que no cumple con nuestros terminos y condiciones.`);
        }catch(error){
          console.log("error creando notificacion para una busqueda eliminada por denuncias: ",error);
        }
        break;
      case 'ADOPTION':
        await publicationDelete(complaint.idPublicationAdoption, 'ADOPTION');
        try{
          await createNotificationForUser(complaint.idUserReported,
            `Se ha eliminado tu adopcion por que no cumple con nuestros terminos y condiciones.`);
        }catch(error){
          console.log("error creando notificacion para una adopcion eliminada por denuncias: ",error);
        }
        break;
      default:
        throw new Error("Error en la categoria del servicio");
    }
  } catch (error) {
    console.log("Error ejecutando el borrado de la denuncia: ", error);
    throw error;
  }

  try {
    const userComplaints = await getComplaintsByUser(complaint.idUserReported);

    console.debug("userComplaints: ", userComplaints);

    if (userComplaints.length >= 3) {
      const userState = await getStateForUser(complaint.idUserReported);
      if (userState.userStateName == 'BLOQUEADO') {
        throw new Error("El usuario ya se encuentra bloqueado!")
      } 

      const bloquedUserState = (await getUserStateByName('BLOQUEADO'))[0].dataValues;
      console.log(bloquedUserState);
      await updateUser(complaint.idUserReported,{blocked: true, blockedReason: "Maximo de denuncias superado"});
      await changeStateUser(complaint.idUserReported, bloquedUserState.idUserState, validateComplaintDto.author.idUser);
      try{
        await createNotificationForUser(complaint.idUserReported,
          `Has superado el maximo permitido de infracciones y por lo tanto tu usuario se encuentra bloqueado. Para poder desbloquearlo deberas comunicarte a projectapplicationbuddy@gmail.com`);
      }catch(error){
        console.log("error creando notificacion para un usuario bloqueado: ",error);
      }
    }
    return;
  } catch (error) {
    console.log("error validando el bloqueo del usuario: ", error);
    throw error;

  }
}







export async function deleteComplaint(complaint) {
  try {
    await Complaint.update(
      { active: false },
      { where: { idComplaint:complaint.idComplaint }, returning: true }
    );
  try{
    await createNotificationForUser(complaint.idUserReporting,
      `La denuncia que levantaste, fue analizada y rechazada por nuestro equipo, si crees que fue un error comunicate a porjectapplicationbuddy@gmail.com. Seguí contribuyendo a mejorar la app!`);
    }catch(error){
      console.log("error creando notificacion para una denuncia eliminada: ",error);
    }
    return;
  } catch (error) {
    throw error;
  }
}


export async function validateComplaint(idComplaint) {
  try {
    const complaint = await Complaint.update(
      { verified: true },
      { where: { idComplaint }, returning: true }
    );

    return complaint;
  } catch (error) {
    console.log(error);
    throw error;
  }
}



export async function getComplaintById(idComplaint) {
  try {
    const query = `
              SELECT *
              FROM complaints
              WHERE idComplaint = "${idComplaint}"`;

    const complaint = await sequelize.query(query, {
      model: Complaint,
      mapToModel: true,
    });

    return complaint;
  } catch (error) {
    throw error;
  }
}

export async function getComplaintsByUser(idUser) {
  try {
    const query = `
      SELECT *
      FROM complaints
      WHERE idUserReported = "${idUser}" AND verified = 1`;

    const complaints = await sequelize.query(query, {
      model: Complaint,
      mapToModel: true,
    });

    return complaints;
  } catch (error) {
    throw error;
  }
}


