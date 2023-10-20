import { getIdToken } from "../../helpers/authHelper.js";
import { aproveComplaint, createComplaint, deleteComplaint, getAllComplaints, getComplaintById } from "../services/complaint.service.js";



export async function postComplaint(req, res) {
  const idComplainant = req.user.idUser;
  const { category } = req.body;
  const validCategories = ['SEARCH', 'ADOPTION', 'SERVICE'];

  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['CREATE_COMPLAINT',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }


  if (!validCategories.includes(category)) {
    return res
      .status(400)
      .json({ message: `Error en la categoria seleccionada, solo puede ser ${validCategories.join(', ')}`, code: 400 });
  }

  try {
    const complaint = await createComplaint(req.body, idComplainant);

    return res
      .status(201)
      .json({ message: "Se creó exitosamente la denuncia", complaint });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}



export async function getComplaintsAll(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const { page, size, } = req.query;

  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['READ_COMPLAINT',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const complaints = await getAllComplaints(page, size);

    if (!complaints[0]) {
      return res.status(204).json({ message: "No existen denuncias activas" });
    }

    return res.status(200).send(JSON.stringify(complaints,(key, value) => {
      
      if (value == null) {
        return undefined;
      }
      return value;
    }));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}



export async function complaintDelete(req, res) {
  const { idComplaint } = req.params;
  
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_COMPLAINT',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const complaint = await getComplaintById(idComplaint);

    if (!complaint[0]) {
      return res
        .status(404)
        .json({ message: "No se ha encontrado la denuncia que se quiere eliminar" });
    }

    await deleteComplaint(complaint[0].dataValues);

    return res
      .status(200)
      .json({ message: "Se ha dado de baja correctamente la denuncia" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}



export async function complaintExecute(req, res) {
  let { idComplaint,validate } = req.params;
  validate = validate.toLowerCase() === "true" ? true : false;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_COMPLAINT',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }


  let validateDto = {};

  try {
    const complaint = await getComplaintById(idComplaint);

    if (!complaint[0]) {
      return res
        .status(404)
        .json({ message: "No se ha encontrado la denuncia que se quiere eliminar" });
    }

    if(validate){
      validateDto.complaint = complaint[0].dataValues;
      validateDto.author = req.user;
      await aproveComplaint(validateDto);
      
      return res
      .status(200)
      .json({ message: "Se ha ejecutado correctamente la denuncia" });
    }else{
      await deleteComplaint(complaint[0].dataValues);
      return res
      .status(200)
      .json({ message: "Se ha dado de baja correctamente la denuncia" });
    }


  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}