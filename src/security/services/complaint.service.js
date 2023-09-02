import { sequelize } from "../../database/database.js";
import { Complaint } from "../../models/Complaint.js";
import { PublicationAdoption } from "../../models/PublicationAdoption.js";
import { PublicationSearch } from "../../models/PublicationSearch.js";
import { Service } from "../../models/Service.js";
import { getPaginatedData } from "../../utils/pagination.js";


export async function createComplaint(data, idComplainant) {
    const {category,reportDescription,idUserReported  } = data;
  
    try {
      const newComplaint = await Complaint.create(
        {category,
        reportDescription,
        idUserReported,
        createdDate: new Date(),
        updatedDate: new Date(),
        idUserReporting: idComplainant},);
  
      return newComplaint;
    } catch (error) {
        console.log(error);
      throw error;
    }
  }
  
  export async function getAllComplaints(page = 1, recordsPerPage = 10) {
    try {
        let include = [
            {model:PublicationAdoption, as:'search', attributes: ['idPublicationSearch','title','isFound','lostDate','createdAt','idUser']},
            {model:PublicationSearch, as:'adoption', attributes: ['idPublicationAdoption','title','createdAt','contactPhone','idUser']},
            {model:Service, as:'service', attributes:['idService','serviceTitle','avgRating','address','createdDate','idUser']},
          ];

        const pageNumber = parseInt(page, 10);
        const recordsPerPageNumber = parseInt(recordsPerPage, 10);
        const complaints = getPaginatedData(Complaint,pageNumber,recordsPerPageNumber,'createdDate',include);
      
  
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