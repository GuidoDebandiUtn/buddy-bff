import {
  activeInformation,
  archiveInformation,
  createInformation,
  deleteInformation,
  getAllInformation,
  getInformationById,
  updateInformation,
} from "../services/information.service.js";
import { getPetById } from "../services/pet.service.js";

export async function informationCreate(req, res) {
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

    const requiredPermissions=['WRITE_PET',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pet[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    const newInformation = await createInformation(req.body, idPet);

    return res
      .status(201)
      .json({ message: "Se creo exitosamente la información", newInformation });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getInformations(req, res) {
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
    const requiredPermissions=['READ_PET_INFO',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pet[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    const information = await getAllInformation(idPet);

    if (!information[0]) {
      return res.status(404).json({ message: "No existe información" });
    }

    return res.status(200).json({ information });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getInformation(req, res) {
  const { idInformation, idPet } = req.params;
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }
    const requiredPermissions=['READ_PET_INFO',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pet[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    const information = await getInformationById(idInformation);

    if (!information[0]) {
      return res
        .status(404)
        .json({ message: "No existe información con ese id" });
    }

    return res.status(200).json({ information });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function informationUpdate(req, res) {
  const { idInformation, idPet } = req.params;
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const requiredPermissions=['WRITE_PET',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pet[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    const information = await getInformationById(idInformation);

    if (!information[0]) {
      return res
        .status(404)
        .json({ message: "No existe información con ese id" });
    }

    await updateInformation(idInformation, req.body);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente la información" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function informationDelete(req, res) {
  const { idInformation, idPet } = req.params;
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const requiredPermissions=['WRITE_PET',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pet[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    const information = await getInformationById(idInformation);

    if (!information[0]) {
      return res
        .status(404)
        .json({ message: "No existe información con ese id" });
    }

    await deleteInformation(idInformation);

    return res
      .status(200)
      .json({ message: "Se ha dado de baja correctamente la información" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function informationActive(req, res) {
  const { idInformation, idPet } = req.params;
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const requiredPermissions=['WRITE_PET',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pet[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }


    const information = await getInformationById(idInformation);

    if (!information[0]) {
      return res
        .status(404)
        .json({ message: "No existe información con ese id" });
    }

    await activeInformation(idInformation);

    return res
      .status(200)
      .json({ message: "Se ha dado de alta correctamente la información" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function informationArchive(req, res) {
  const { idInformation, idPet } = req.params;
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const requiredPermissions=['WRITE_PET',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pet[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    const information = await getInformationById(idInformation);

    if (!information[0]) {
      return res
        .status(404)
        .json({ message: "No existe información con ese id" });
    }

    await archiveInformation(idInformation, information[0].archive);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente la información" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
