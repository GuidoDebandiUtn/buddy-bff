import { sequelize } from "../../database/database.js";
import { publicationDelete } from "../../lost-adoption/services/publication.service.js";
import { Complaint } from "../../models/Complaint.js";
import { PublicationAdoption } from "../../models/PublicationAdoption.js";
import { PublicationSearch } from "../../models/PublicationSearch.js";
import { Service } from "../../models/Service.js";
import { deleteService } from "../../services/services/service.service.js";
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


    const complaints = Complaint.findAll({ offset, limit, order, attributes, include, where })

    return complaints;
  } catch (error) {
    throw error;
  }
}


export async function deleteComplaint(idComplaint) {
  try {
    await Complaint.update(
      { active: false },
      { where: { idComplaint }, returning: true }
    );

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


export async function aproveComplaint(validateComplaintDto) {
  const complaint = validateComplaintDto.complaint;

  await validateComplaint(complaint.idComplaint);

  console.debug("valor de denuncia: ",complaint);

  try {
    switch (complaint.category) {
      case 'SERVICE':
        await deleteService(complaint.idService);
        break;
      case 'SEARCH':
        await publicationDelete(complaint.idPublicationSearch, 'SEARCH');
        break;
      case 'ADOPTION':
        await publicationDelete(complaint.idPUblicationAdoption, 'ADOPTION');
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
    }
    return;
  } catch (error) {
    console.log("error validando el bloqueo del usuario: ", error);
    throw error;

  }
}