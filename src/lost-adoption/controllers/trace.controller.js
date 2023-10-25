import { getPublicationById } from "../services/publication.service.js";
import { createTrace, getTraceById, retrieveTracesByPublication, traceDelete, updateTrace } from "../services/trace.service.js";


export async function getTracesByPublication(req, res) {
    const { idPublicationSearch } = req.params;
    const idUser = req.user.idUser;

    const userPermissions = req.user.permissions;

    let requiredPermissions=['READ_TRAZAS',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }
  
  
  
      if(!idPublicationSearch){
        return res
        .status(400)
        .json({ message: `El parametro idPublicationSearch es obligatorio`, code: 400 });
      }
  
    try {
      const data = await retrieveTracesByPublication(idPublicationSearch,idUser);
  
      if (!data) {
        return res.status(500).json({ message: "Internal Error retriving traces" });
      }
  
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function postTrace(req, res) {
    const idUser = req.user.idUser;
    const userPermissions = req.user.permissions;

    let publication = await getPublicationById(req.body.idPublicationSearch);
    if (!publication) {
      return res.status(404).json({ message: "No se ha podido obtener la pulicacion asociada a la traza" });
    }

    let requiredPermissions=['READ_TRAZAS',"WRITE_TRAZAS"];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
    if (!hasAllPermissions && publication.idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }
  
  
    try {
      const trace = await createTrace(req.body,idUser,publication);
      return res.status(201).json(trace);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }


  export async function deleteTrace(req, res) {
    const { idTrace } = req.params;
    const idUser = req.user.idUser;
    const userPermissions = req.user.permissions;
  
    if(!idTrace){
      return res.status(400).json({ message: `El parametro idTrace es obligatorio`, code: 400 });
    }

    const trace = await getTraceById(idTrace);
    if (!trace[0]) {
      return res.status(404).json({message: `Error obteniendo la traza a eliminar`,});
    }

    const publication = await getPublicationById(trace[0].idPublicationSearch);
    if (!publication[0]) {
      return res.status(404).json({ message: "Erropr en la publicacion asociada a la traza" });
    }

    let requiredPermissions=["WRITE_TRAZAS",];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
    if (!hasAllPermissions && publication[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }
  
  
  
    try {
      await traceDelete(idTrace);
      return res.status(200).json({message:"Se ha dado de baja correctamente la traza de la publicacion",});
    } catch (error) {
      res.status(500).json({message: error.message,});
    }
  }

  export async function putTrace(req, res) {
    const { idTrace } = req.params;
    const idUser = req.user.idUser;
    const userPermissions = req.user.permissions;
  
    if(!idTrace){
      return res.status(400).json({ message: `El parametro idTrace es obligatorio`, code: 400 });
    }

    const trace = await getTraceById(idTrace);
    if (!trace[0]) {
      return res.status(404).json({message: `Error obteniendo la traza a eliminar`,});
    }

    const publication = await getPublicationById(trace[0].idPublicationSearch);
    if (!publication[0]) {
      return res.status(404).json({ message: "Error en la publicacion asociada a la traza" });
    }

    let requiredPermissions=["WRITE_TRAZAS",];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
    if (!hasAllPermissions && publication[0].idUser != idUser) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }
  
    try {
      await updateTrace(req.body, idTrace);
      return res.status(200).json({ message: "Se ha modificado la traza Correctamente" });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  