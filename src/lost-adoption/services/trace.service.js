import { Trace } from "../../models/Trace.js";
import { getPublicationById } from "./publication.service.js";


export async function createTrace(traceDto,idUser) {
    try {
      let publication = await getPublicationById(traceDto.idPublicationSearch);

  
      if (!publication) {
        throw new Error("No se ha podido obtener la pulicacion asociada a la traza");
      }
  
  
      console.log(`Calling Trace.create with: ${JSON.stringify(traceDto)}`);
      const newTrace = await Trace.create({
        idAuthorUser: idUser,
        ...traceDto,
      });
  
      return newTrace;
    } catch (error) {
      console.error("Error creating a trace:", error);
      throw error;
    }
  }


  export async function retrieveTracesByPublication(idPublicationSearch) {
    try {
      const traces =await Trace.findAll({where: {idPublicationSearch: idPublicationSearch, active:true},});
      console.log ("trazas obtenidas correctamente pra traza: %s",idPublicationSearch);
      return  {traces};

    } catch (err) {
      console.error('Error al obtener las traza de la publicacion: %s',idPublicationSearch, error);
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
  
      console.log(
        `Se ha eliminado correctamente la traza. Nueva entidad: '${trace}'`
      );
  
      return trace;
    } catch (error) {
      console.error("Error deleting the trace with id:", idTrace);
      console.error(error);
      throw error;
    }
  }


  export async function updateTrace(  traceDto,  idTrace) {
  
    console.log(`Llamando a update de '${JSON.stringify(idTrace)}', con el dto: ${JSON.stringify(traceDto)}`);
    try {
      let traceNew = await Trace.update(
        { ...traceDto },
        { where: {idTrace: idTrace}, returning: true }
      );
  
      return traceNew;
    } catch (error) {
      console.error(error);
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
      console.log(
        "Ocurrio un error durante la consulta a BD de la traza con ID:",
        idTrace
      );
      console.log(error);
      throw error;
    }
  }