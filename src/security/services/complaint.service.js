import { sequelize } from "../../database/database.js";
import { Complaint } from "../../models/Complaint.js";
import { PublicationAdoption } from "../../models/PublicationAdoption.js";
import { PublicationSearch } from "../../models/PublicationSearch.js";
import { Service } from "../../models/Service.js";


export async function createComplaint(data, idComplainant) {
  const { category, reportDescription, idUserReported, idReference } = data;
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
      reportDescription,
      idUserReported,
      createdDate: new Date(),
      updatedDate: new Date(),
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
      { model: Service, attributes: ['idService', 'serviceTitle', 'avgRating', 'address', 'createdDate', 'idUser'] },
    ];
    let attributes = ['idComplaint', 'idUserReporting', 'idUserReported', 'reportDescription', 'category', 'active', 'verified', 'createdDate', 'updatedDate'];
    const offset = (parseInt(page, 10) - 1) * recordsPerPage;
    const limit = parseInt(recordsPerPage, 10);
    const order = [['createdDate', 'DESC']];
    const where = {active: 1};


    const complaints = Complaint.findAll({ offset, limit, order, attributes, include,where })

    return complaints;
  } catch (error) {
    throw error;
  }
}


export async function deleteComplaint(idComplaint) {
  try {
    await Complaint.update(
      { active: false, updatedDate: new Date() },
      { where: { idComplaint }, returning: true }
    );

    return;
  } catch (error) {
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


export async function aproveComplaint(idComplaint) {


//recuperar denuncia
//update de la denuncia con revision = true
//buscar denuncias activas y verificadas del idUser
//bloquear al usuario si cuenta con 3 o mas denuncias activas y verificadas
}