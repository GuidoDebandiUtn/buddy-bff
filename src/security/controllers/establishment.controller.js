import {
  getAllEstablishments,
  getEstablishmentById,
  getEstablishmentDocuments,
  getEstablishmentsRevision,
  updateEstablishment,
  validateEstablishment,
} from "../services/establishment.service.js";
import { getUserById } from "../services/user.service.js";

export async function getEstablishments(req, res) {
  const userPermissions = req.user.permissions;
  let requiredPermissions=['READ_USUARIOS',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const establishments = await getAllEstablishments();

    if (!establishments[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun establecimiento" });
    }

    return res.status(200).json(establishments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getEstablishment(req, res) {
  const { idUser } = req.params;
  const userPermissions = req.user.permissions;
  let requiredPermissions=['READ_USUARIOS',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const establishments = await getEstablishmentById(idUser);

    if (!establishments[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun establecimiento" });
    }

    return res.status(200).json(establishments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function postValidateEstablishment(req, res) {
  const { idUser } = req.params;

  try {
    const userPermissions = req.user.permissions;
    const permisionRequired = 'WRITE_DOCUMENTACION';
    if (!userPermissions.includes(permisionRequired)) {
      return res.status(403).json({
        error:
          "No se cuenta con los permissions necesarios para ejecutar el EndPoint",
      });
    }

    if (!idUser) {
      return res
        .status(400)
        .json({ error: "No se ha podido obtener el parametro IdUser" });
    }

    const userRevision = await getUserById(idUser);

    if (!userRevision[0]) {
      return res.status(404).json({
        error: "Error obteniendo el usuario para validacion",
      });
    }

    req.body.author = req.user;

    const validateResponse = await validateEstablishment(
      idUser,
      userRevision[0].mail,
      req.body
    );

    return res.status(200).json({
      message: "Se ha procesado la solicitud e informado al usuario.",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

export async function establishmentUpdate(req, res) {
  const { idUser } = req.params;

  const userPermissions = req.user.permissions;
  let requiredPermissions=['WRITE_USUARIOS',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }


  try {
    const establishment = await getEstablishmentById(idUser);

    if (!establishment[0]) {
      return res.status(404).json({
        message: "No existe ningun establecimiento con ese id",
      });
    }

    await updateEstablishment(idUser, req.body);

    res
      .status(200)
      .json({ message: "Se ha actualizado correctamente el establecimiento" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getRevisionEstablishments(req, res) {

  const userPermissions = req.user.permissions;
  let requiredPermissions=['READ_LISTA_USUARIOS',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const establishments = await getEstablishmentsRevision();

    if (!establishments[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun establecimiento" });
    }

    return res.status(200).json(establishments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getDocumentsEstablishment(req, res) {
  const { idUser } = req.params;

  const userPermissions = req.user.permissions;
  let requiredPermissions=['READ_DOCUMENTACION',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const documents = await getEstablishmentDocuments(idUser);

    if (!documents[0]) {
      return res.status(404).json({ message: "No existe ningun documentos" });
    }

    return res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
