import { Rating } from "../../models/Rating.js";
import { calculateAverageRating, getServiceById } from "./service.service";


export async function createRating(idUser, data) {
    const { titleRating,descriptionRating,numberRating,idService } = data;
    const service = await getServiceById(idService);

    if(!service[0]){
        throw {message: "Error obteniendo el servicio asociado a la valoracion", code: 400};
    }
  
    try {
      const newRating = await Rating.create(
        { titleRating,descriptionRating,numberRating, idService,idUser},
        { fields: ["titleRating", "descriptionRating", "numberRating", "idService", "idUser"], }
      ); 
  
      await calculateAverageRating(service);
  
      return newRating;
    } catch (error) {
      console.log(error);
      throw error;
    }
  
  }
  