import {
  getAllEstablishments,
  getEstablishmentById,
  getEstablishmentDocuments,
  getEstablishmentsRevision,
  updateEstablishment,
  validateEstablishment,
} from "../services/establishment.service.js";

export async function getEstablishments(req, res) {
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

  const userPermissions = req.user.permissions[0];
  const permisionRequired = "WRITE_DOCUMENTACION";
  if (userPermissions.include(permisionRequired)) {
    res.status(403).json({
      error:
        "No se cuenta con los permisos necesarios para ejecutar el EndPoint",
    });
  }

  if (!idUser) {
    res
      .status(400)
      .json({ error: "No se ha podido obtener el parametro IdUser" });
  }

  req.body.author = req.user;
  try{
    const validateResponse = await validateEstablishment(idUser, req.body);
    return res.status(200).json({message:"Se ha procesado la solicitud e informado al usuario."});
  }catch(error){
    if (error.code) {
      return res.status(error.code).json({
        error: error.message,
      });
    }
    return res.status(500).json({
      error: error.message,
    });
  }
}


  
export async function establishmentUpdate(req, res) {
  const { idUser } = req.params;

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
