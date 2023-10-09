import { Rating } from "../../models/Rating.js";
import { Service } from "../../models/Service.js";
import { calculateAverageRating, getServiceById } from "./service.service.js";


export async function createRating(idUser, data) {
    const { titleRating,descriptionRating,idService,numberRating } = data;

    const service = await getServiceById(idService);

    if(!service[0]){
        throw {message: "Error obteniendo el servicio asociado a la valoracion", code: 400};
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
      console.error("error creando notificacion para una nueva traza de una publicacion: ",error);
    }

      return newRating;
    } catch (error) {
      console.log(error);
      throw error;
    }
  
  }


export async function obtainRatingByService(idService) {
    const service = await getServiceById(idService);

    if(!service[0]){
        throw {message: "Error obteniendo el servicio asociado a las valoraciones", code: 400};
    }
  
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

    if(!rating){
        throw {message: "Error obteniendo la calificacion a eliminar", code: 400};
    }
  
    try {
      await Rating.update(
        {active:0},
        {where:{ idService}}
      ); 

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



export async function updateRatingService(idRating, data) {

    const rating = await Rating.findOne({where:{idRating}});

    if(!rating){
        throw {message: "Error obteniendo la calificacion a modificar", code: 400};
    }
  
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