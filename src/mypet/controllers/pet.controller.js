import {
  activePet,
  createPet,
  deletePet,
  getAllPets,
  getPetById,
  getPetByName,
  updatePet,
} from "../services/pet.service.js";
import { getPetTypeById } from "../../parameters/services/petType.service.js";
import { getPetBreedById } from "../../parameters/services/petBreed.service.js";
import {getIdToken} from "../../helpers/authHelper.js"


const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[0-1])$/;

export async function petCreate(req, res) {
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');


  const requiredPermissions=['CREATE_PET',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }




  if (!dateRegex.test(req.body.birthDate)) {
    return res
    .status(400)
    .json({ message: "Error en el formato de fecha" });
  }

  

  try {
    const petType = await getPetTypeById(req.body.idPetType);

    if (!petType[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningún tipo de mascota con ese id" });
    }

    if (req.body.idPetBreed) {
      const petBreed = await getPetBreedById(req.body.idPetBreed);

      if (!petBreed[0]) {
        return res
          .status(404)
          .json({ message: "No existe ninguna raza con ese id" });
      }
    }

    // const duplicate = await getPetByName(idUser, req.body.petName);

    // if (duplicate[0]) {
    //   return res
    //     .status(400)
    //     .json({ message: "Ya tienes una mascota activa con ese nombre" });
    // }



    const newPet = await createPet(req.body, idUser);

    return res
      .status(201)
      .json({ message: "Se creó exitosamente la mascota", newPet });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getPets(req, res) {
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');

  try {
    const pets = await getAllPets(idUser);

    if (!pets[0]) {
      return res.status(404).json({ message: "No existen mascotas" });
    }

    const requiredPermissions=['READ_MI_MASCOTA',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pets[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    return res.status(200).json({ pets });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getPet(req, res) {
  const { idPet } = req.params;
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');

  try {
    const pet = await getPetById(idPet);

    const requiredPermissions=['READ_MI_MASCOTA',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pet[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    return res.status(200).json({ pet });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function petUpdate(req, res) {
  const { idPet } = req.params;
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');

  if (!dateRegex.test(req.body.birthDate)) {
    return res
    .status(400)
    .json({ message: "Error en el formato de fecha" });
  }

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const requiredPermissions=['WRITE_MI_MASCOTA',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pet[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }


    if (req.body.idPetType) {
      const petType = await getPetTypeById(req.body.idPetType);

      if (!petType[0]) {
        return res
          .status(404)
          .json({ message: "No existe ningún tipo de mascota con ese id" });
      }
    }

    if (req.body.idPetBreed) {
      const petBreed = await getPetBreedById(req.body.idPetBreed);

      if (!petBreed[0]) {
        return res
          .status(404)
          .json({ message: "No existe ninguna raza con ese id" });
      }
    }

    await updatePet(idPet, req.body);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente la mascota" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function petDelete(req, res) {
  const { idPet } = req.params;
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const requiredPermissions=['WRITE_MI_MASCOTA',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pet[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    await deletePet(idPet);

    return res
      .status(200)
      .json({ message: "Se ha dado de baja correctamente la mascota" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function petActive(req, res) {
  const { idPet } = req.params;
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const requiredPermissions=['WRITE_MI_MASCOTA',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pet[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    await activePet(idPet);

    return res
      .status(200)
      .json({ message: "Se ha dado de alta correctamente la mascota" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
