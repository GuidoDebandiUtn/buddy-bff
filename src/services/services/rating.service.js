import { Rating } from "../../models/Rating.js";
import { Service } from "../../models/Service.js";
import { calculateAverageRating, getServiceById } from "./service.service.js";


export async function createRating(idUser, data) {
    const { titleRating,descriptionRating,idService,numberRating } = data;
   
    try {
      const newRating = await Rating.create(
        { titleRating,descriptionRating, numberRating, idService,idUser},
        { fields: ["titleRating", "descriptionRating", "numberRating", "idService", "idUser"], }
      ); 
  

      await calculateAverageRating(service[0]);
    try{
      await CreateNotificationForUser(service.idUser,`Alguien ha calificado tu servicio!`);
    }catch(error){
      console.error("error creando notificacion para una nueva traza de una publicacion: ",error);
    }

      return newRating;
    } catch (error) {
      console.log(error);
      throw error;
    }
  
  }


export async function obtainRatingByService(idService) {
  
    try {
      const ratings = await Rating.findAll(
        {where:{ idService, active:true}}
      ); 
  
      return ratings;
    } catch (error) {
      console.log(error);
      throw error;
    }
}

export async function deleteRatingService(idRating) {
    const rating = await Rating.findOne({where:{idRating}});
  
    try {
      await Rating.update(
        {active:0},
        {where:{ idService:rating[0].idService}}
      ); 

      const service = await Service.findOne({where:{idService:rating.idService}});

      await calculateAverageRating(service[0]);
  
      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
}



export async function updateRatingService(idRating, data) {

    const rating = await Rating.findOne({where:{idRating}});

  
    try {
      const updateOptions = { where: { idRating: idRating} };
  
      const updates = {
        ...(data.titleRating && { titleRating: data.titleRating }),
        ...(data.descriptionRating && { descriptionRating: data.descriptionRating }),
        ...(data.serviceDescription && { serviceDescription: data.serviceDescription }),
        ...(data.numberRating && { numberRating: data.numberRating }),
      };
    
      await Rating.update(updates, updateOptions);


      const service = await Service.findOne({where:{idService:rating.idService}});
      if(!service){
        throw {message: "Error en la obtencion del servicio asociado a la calificacion", code:500}
      }
      await calculateAverageRating(service);
  
      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
}