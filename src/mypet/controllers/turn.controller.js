import {
  activeTurn,
  archiveTurn,
  createTurn,
  deleteTurn,
  getAllTurns,
  getTurnById,
  updateTurn,
} from "../services/turn.service.js";
import { getPetById } from "../services/pet.service.js";



const dateRegex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

export async function turnCreate(req, res) {
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

    if (!dateRegex.test(req.body.turnDate)) {
      console.log ("error en el formato del turno: obtenido: %s, esperado AAAA-mm-dd HH:mm:ss",req.body.turnDate);
      return res
      .status(400)
      .json({ message: "Error en el formato de fecha" });
    }


    const newTurn = await createTurn(req.body, idPet);

    return res
      .status(201)
      .json({ message: "Se creo exitosamente el turno", newTurn });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getTurns(req, res) {
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

    const requiredPermissions=['READ_PET',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pet[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    const turns = await getAllTurns(idPet);

    if (!turns[0]) {
      return res.status(404).json({ message: "No existen turnos" });
    }

    return res.status(200).json({ turns });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getTurn(req, res) {
  const { idTurn, idPet } = req.params;
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const requiredPermissions=['READ_PET',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pet[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    const turn = await getTurnById(idTurn, idPet);

    if (!turn[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun turno con ese id" });
    }

    return res.status(200).json({ turn });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function turnUpdate(req, res) {
  const { idTurn, idPet } = req.params;
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');

  if (!dateRegex.test(req.body.turnDate)) {
    console.log("error en el formato del turno: obtenido: %s, esperado AAAA-mm-dd HH:mm:ss",req.body.turnDate);
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

    const requiredPermissions=['WRITE_PET',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pet[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    const turn = await getTurnById(idTurn, idPet);

    if (!turn[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun turno con ese id" });
    }

    await updateTurn(idTurn, req.body);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente el turno" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function turnDelete(req, res) {
  const { idTurn, idPet } = req.params;
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

    const turn = await getTurnById(idTurn, idPet);

    if (!turn[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun turno con ese id" });
    }

    await deleteTurn(idTurn);

    return res
      .status(200)
      .json({ message: "Se ha dado de baja correctamente el turno" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function turnActive(req, res) {
  const { idTurn, idPet } = req.params;
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const turn = await getTurnById(idTurn, idPet);

    if (!turn[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun turno con ese id" });
    }

    const requiredPermissions=['WRITE_PET',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions && pet[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    await activeTurn(idTurn);

    return res
      .status(200)
      .json({ message: "Se ha dado de alta correctamente el turno" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function turnArchive(req, res) {
  const { idTurn, idPet } = req.params;
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

    const turn = await getTurnById(idTurn, idPet);

    if (!turn[0]) {
      return res
        .status(404)
        .json({ message: "No existe información con ese id" });
    }
    console.log(turn[0].archive);
    await archiveTurn(idTurn, turn[0].archive);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente el turno" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
