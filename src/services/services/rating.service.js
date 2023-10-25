import { Rating } from "../../models/Rating.js";
import { Service } from "../../models/Service.js";
import { calculateAverageRating, getServiceById } from "./service.service.js";
import { createNotificationForUser } from "../../reports/service/notifications.services.js";
import log  from "../../helpers/loggerHelper.js";


export async function createRating(idUser, data) {
    const { titleRating,descriptionRating,idService,numberRating } = data;


    const service = await getServiceById(idService);

    if(!service[0]){
        throw {message: "Error obteniendo el servicio asociado a la valoracion", code: 400};
    }

    if(service[0].idUser == idUser){
      throw {message: "No es posible calificar un servicio propio", code: 400};
    }
    
    try {
      const newRating = await Rating.create(
        { titleRating,descriptionRating, numberRating, idService,idUser},
        { fields: ["titleRating", "descriptionRating", "numberRating", "idService", "idUser"], }
      ); 
  

      await calculateAverageRating(service[0]);
    try{
      await createNotificationForUser(service.idUser,`Alguien ha calificado tu servicio!`);
    }catch(error){
      log('warn',`error creando notificacion para una nueva traza de una publicacion, error: ${error}`);
    }

      return newRating;
    } catch (error) {
      log('error',`error creando el nuevo servicio, error: ${error}`);
      throw error;
    }
  
  }


export async function obtainRatingByService(idService) {
    const service = await getServiceById(idService);
    log('debug',`"se obtuvo el siguiente servicio: ${service}, para el id: '${idService}'`);
    if(!service[0]){
        throw {message: "Error obteniendo el servicio asociado a las valoraciones", code: 400};
    }

  
    try {
      const ratings = await Rating.findAll(
        {where:{ idService, active:true}}
      ); 
  
      return ratings;
    } catch (error) {
      log('error',`error obteniendo las calificaciones del servicio: '${idService}', error: ${error}`);
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
      log('error',`error eliminando la calificacion: '${idRating}', error: ${error}`);
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
      log('error',`error actualizando la calificacion: '${idRating}', error: ${error}`);
      throw error;
    }
}