import { createRating, deleteRatingService, obtainRatingByService, updateRatingService } from "../services/rating.service.js";

export async function postNewRating(req, res) {
    const idUser = req.user.idUser;

  
    try {
        const rating = await createRating(idUser,req.body);

        return res.status(201).json(rating);
    } catch (error) {
        if(error.code){
          return res.status(error.code).json({
            message: error.message,
          });
        }
        return res.status(500).json({
          message: error.message,
        });
      }
}
export async function getRatingsByService(req, res) {
    const { idService } = req.params;
    try {
        const ratings = await obtainRatingByService(idService);

        if(!ratings[0]){
            return res.status(204).json("No se ha podido obtener ninguna calificacion para el servicio.");
        }
  
        return res.status(200).json(ratings);
    } catch (error) {
        if(error.code){
          return res.status(error.code).json({
            message: error.message,
          });
        }
        return res.status(500).json({
          message: error.message,
        });
      }
}


export async function deleteRating(req, res) {
    const { idRating } = req.params;
    try {
        await deleteRatingService(idRating);
  
        return res.status(200).json({message:"Se eliminado correctamente la calificacion"});
    } catch (error) {
        if(error.code){
          return res.status(error.code).json({
            message: error.message,
          });
        }
        return res.status(500).json({
          message: error.message,
        });
      }
}



export async function putRating(req, res) {
    const { idRating } = req.params;
    try {
        await updateRatingService(idRating,req.body);
  
        return res.status(200).json({message:"Se modificado correctamente la calificacion"});
    } catch (error) {
        if(error.code){
          return res.status(error.code).json({
            message: error.message,
          });
        }
        return res.status(500).json({
          message: error.message,
        });
      }
}