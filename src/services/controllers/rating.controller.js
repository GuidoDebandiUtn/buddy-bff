import { createRating, deleteRatingService, obtainRatingByService, updateRatingService } from "../services/rating.service.js";
import { getServiceById } from "../services/service.service.js";
import { Rating } from "../../models/Rating.js";
import { Service } from "../../models/Service.js";

export async function postNewRating(req, res) {
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions;

  let requiredPermissions = ["WRITE_CALIFICACIONES",];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));


  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const rating = await createRating(idUser, req.body);

    return res.status(201).json(rating);
  } catch (error) {
    if (error.code) {
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
  const userPermissions = req.user.permissions;
  const idUser = req.user.idUser;

  try {
    let requiredPermissions = ["READ_CALIFICACIONES",];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

    const service = await getServiceById(idService);
    if (!service[0]) {
      throw { message: "Error obteniendo el servicio asociado a las valoraciones", code: 400 };
    }

    if (!hasAllPermissions && service[0].idUser !== idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    const ratings = await obtainRatingByService(idService);

    if (!ratings[0]) {
      return res.status(204).json("No se ha podido obtener ninguna calificacion para el servicio.");
    }

    return res.status(200).json(ratings);
  } catch (error) {
    if (error.code) {
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
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions;

  let requiredPermissions = ["WRITE_CALIFICACIONES",];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));


  const rating = await Rating.findOne({ where: { idRating } });

  if (!rating[0]) {
    throw { message: "Error obteniendo la calificacion a eliminar", code: 400 };
  }

  const service = await getServiceById(rating[0].idService);
  if (!service[0]) {
    throw { message: "Error obteniendo el servicio asociado a las valoraciones", code: 400 };
  }

  if (!hasAllPermissions && service[0].idUser !== idUser) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    await deleteRatingService(idRating);

    return res.status(200).json({ message: "Se eliminado correctamente la calificacion" });
  } catch (error) {
    if (error.code) {
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

  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions;

  let requiredPermissions = ["WRITE_CALIFICACIONES",];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  try {
    const rating = await Rating.findOne({ where: { idRating } });

    if (!rating) {
      throw { message: "Error obteniendo la calificacion a modificar", code: 400 };
    }

    if (!hasAllPermissions && rating.idUser !== idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: error.message,
    });
  }



  try {
    await updateRatingService(idRating, req.body);

    return res.status(200).json({ message: "Se modificado correctamente la calificacion" });
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: error.message,
    });
  }
}