import { Trace } from "../../models/Trace.js";
import { createNotificationForUser } from "../../reports/service/notifications.services.js";
import { getPublicationById } from "./publication.service.js";
import log  from "../../helpers/loggerHelper.js";

export async function createTrace(traceDto,idUser,publication) {
    try {
  
      log('debug',`Calling Trace.create with: ${JSON.stringify(traceDto)}`);
      const newTrace = await Trace.create({
        idAuthorUser: idUser,
        ...traceDto,
      });

      log('debug',`publicacion referida a la traza : ${JSON.stringify(publication)}`);
      log('debug',`IdAuthor: ${idUser}, publication.user: ${publication.user.idUser}`);
      if(idUser !== publication.user.idUser){
        try{
          await createNotificationForUser(publication.user.idUser,`Se ha agregado una nueva traza a tu publicacion!`);
        }catch(error){
          log('error',`error creando notificacion para una nueva traza de una publicacion, error: ${error}`);
        }
      }

      return newTrace;
    } catch (error) {
      log('error',`Error creating a trace, error:${error}`);
      throw error;
    }
  }


  export async function retrieveTracesByPublication(idPublicationSearch) {
    try {
      const traces =await Trace.findAll({where: {idPublicationSearch: idPublicationSearch, active:true},});
      log('debug',`trazas obtenidas correctamente para publicacion: '${idPublicationSearch}'`);
      return  {traces};

    } catch (err) {
      log('error',`Error al obtener las traza de la publicacion: '${idPublicationSearch}',error: ${err}`);
      throw err;
    }
  };


  export async function traceDelete(idTrace) {
  
    let trace;
  
    try {
      trace = await Trace.update(
        {
          active: false,
          updatedDate: new Date(),
        },
        { where: {idTrace: idTrace}, returning: true }
      );
  
      log('log',`Se ha eliminado correctamente la traza. Nueva entidad: '${trace}'`);
  
      return trace;
    } catch (error) {
      log('error',`Error deleting the trace with id: '${idTrace}', error: ${error}`);
      throw error;
    }
  }


  export async function updateTrace(  traceDto,  idTrace) {
  
    log('debug',`Llamando a update de '${JSON.stringify(idTrace)}', con el dto: ${JSON.stringify(traceDto)}`);
    try {
      let traceNew = await Trace.update(
        { ...traceDto },
        { where: {idTrace: idTrace}, returning: true }
      );
  
      return traceNew;
    } catch (error) {
      log('error',`error actualizando la traza, error: ${error}`);
      throw new Error(
        `Error durante la actualizacion de los datos de la publicacion. error: '${error}'.`
      );
    }
  }


  export async function getTraceById(idTrace) {

    try {
      const trace = await Trace.findOne({
        where: {idTrace: idTrace},
      });
  
      return trace;
    } catch (error) {
      log('error',`Ocurrio un error durante la consulta a BD de la traza con ID: ${idTrace}, error: ${error}`);
      throw error;
    }
  }