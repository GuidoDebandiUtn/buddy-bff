import { Rating } from "../../models/Rating.js";
import { calculateAverageRating, getServiceById } from "./service.service.js";


export async function createRating(idUser, data) {
    const { titleRating,descriptionRating,idService } = data;

    console.log(data);
    const service = await getServiceById(idService);

    if(!service[0]){
        throw {message: "Error obteniendo el servicio asociado a la valoracion", code: 400};
    }
  
    try {
      const newRating = await Rating.create(
        { titleRating,descriptionRating, idService,idUser},
        { fields: ["titleRating", "descriptionRating", "numberRating", "idService", "idUser"], }
      ); 
  
      await calculateAverageRating(service);
  
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
      };
    
      await Rating.update(updates, updateOptions);
  
      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
}