import { createTrace, getTraceById, retrieveTracesByPublication, traceDelete, updateTrace } from "../services/trace.service";



export async function getTracesByPublication(req, res) {
    const { idPublicationSearch } = req.query;
    const idUser = req.user.idUser;
  
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
    let trace;
  
    try {
      trace = await createTrace(req.body,idUser);
      return res.status(201).json(publication);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }


  export async function deleteTrace(req, res) {
    const { idTrace } = req.query;
  
  
    if(!idTrace){
      return res
      .status(400)
      .json({ message: `El parametro idTrace es obligatorio`, code: 400 });
    }
  
    console.log(`Iniciado proceso de eliminacion de traza - Parametros , idPublication= '${idTrace}'`);
  
    try {
      const trace = await getTraceById(idTrace);
      console.log(
        `Traza obtenida correctamente. entidad obtenida: '${trace}'`
      );
      if (!trace) {
        return res
          .status(404)
          .json({
            message: `Error obteniendo la traza a eliminar`,
          });
      }
      await traceDelete(idTrace);
      return res
        .status(200)
        .json({
          message:
            "Se ha dado de baja correctamente la traza de la publicacion",
        });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  export async function putTrace(req, res) {
    const { idTrace } = req.query;
  
    if(!idTrace){
      return res
      .status(400)
      .json({ message: `El parametro idTrace es obligatorio`, code: 400 });
    }
    
    try {
      let trace = await getTraceById(idTrace);
      if (!trace) {
        return res
          .status(204)
          .json({
            message: `No se ha podido encontrar la traza de Id: '${idTrace}'.`,
          });
      }
      trace = await updateTrace(req.body, idTrace);
  
      return res
        .status(200)
        .json({ message: "Se ha modificado la traza Correctamente" });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  