import { createRating } from "../services/rating.service";

export async function postNewRating(req, res) {
    const idUser = req.user.idUser;
  
    try {
        const rating = await createRating(idUser,req.idService);
  
        return res.status(200).json("Se creado correctanente la valoracion", rating);
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