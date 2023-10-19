import { getIdToken } from "../../helpers/authHelper.js";
import { getUserById } from "../../security/services/user.service.js";
import {
    retrivePaginatedPublications,
    createSearch,
    publicationDelete,
    getPublicationById,
    createAdoption,
    updatePublication,
    getPublicationsByUser,
    closePublication,
} from "../services/publication.service.js";



export async function getPublications(req, res) {
  const { modelType, page, size } = req.query;
  
  if(!modelType){
    return res
    .status(400)
    .json({ message: `El parametro modelType es obligatorio`, code: 400 });
  }


  const userPermissions = req.user.permissions[0].permisos.split(' - ');

  const requiredPermissions=[];
  if(modelType.toUpperCase() == 'ADOPTION'){
    requiredPermissions=['READ_PUBLICACION_ADOPCION',];
  }else{
    requiredPermissions=['READ_PUBLICACION_BUSQUEDA',];
  }

  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permisos necesarios" });
  }

  try {
    const data = await retrivePaginatedPublications(page, size, modelType);

    if (!data) {
      return res.status(404).json({ message: "Error retriving publications" });
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function obtainPublicationsByUser(req,res){
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permisos.split(' - ');

  const requiredPermissions=['READ_PUBLICACION_BUSQUEDA','READ_PUBLICACION_ADOPCION'];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permisos necesarios" });
  }


  try {
    const user = await  getUserById(idUser);


    if (!user[0]) {
      return res
        .status(404)
        .json({ message: "No se han encontrado el usuario indicado" });
    }

    console.log ("user obtenido correctamente");
    const data = await getPublicationsByUser(idUser);

    console.log ("publicaciones obtenidas correctamente");
    if (!data) {
      return res
        .status(204)
        .json({ message: "No se han encontrado ninguna publicacion para el usuario" });
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

}



export async function postSearch(req, res) {
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permisos.split(' - ');

  const requiredPermissions=['CREATE_PUBLICACION_BUSQUEDA',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permisos necesarios" });
  }

  try {
    let publication;
    if (req.body.lostDate && checkParameters(req.body,'SEARCH')) {
      publication = await createSearch(req.body,idUser);
    }

    return res.status(201).json(publication);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function postAdoption(req, res) {
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permisos.split(' - ');

  const requiredPermissions=['CREATE_PUBLICACION_ADOPCION',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permisos necesarios" });
  }


  try {
    checkParameters(req.body,'ADOPTION');
    const publication = await createAdoption(req.body,idUser);

    return res.status(201).json(publication);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function deletePublication(req, res) {
  const { idPublication } = req.params;
  const { modelType } = req.query;
  const idUser = req.user.idUser;

  const userPermissions = req.user.permissions[0].permisos.split(' - ');

  const requiredPermissions=['WRITE_PUBLICACION_ADOPCION','WRITE_PUBLICACION_BUSQUEDA'];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));


  const publication = await getPublicationById(idPublication, modelType);
  console.debug(`publicacion obtenida correctamente. entidad obtenida: '${publication}'`);
  if (!publication[0]) {
    return res.status(404).json({message: `No se ha podido encontrar la publicacion a eliminar`,});
  }

  if (!hasAllPermissions && publication[0].idUser != idUser) {
    return res.status(403).json({ message: "No se cuenta con todos los permisos necesarios" });
  }


  if(!modelType){
    return res
    .status(400)
    .json({ message: `El parametro modelType es obligatorio`, code: 400 });
  }

  console.log(`Iniciado proceso de eliminacion de publicacion - Parametros modelType='${modelType}', idPublication= '${idPublication}'`);

  try {


    await publicationDelete(idPublication, modelType);

    return res
      .status(200)
      .json({
        message:
          "Se ha dado de baja correctamente la publicacion de la mascota",
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function putPublication(req, res) {
  const { modelType } = req.query;
  const { idPublication } = req.params;
  const userPermissions = req.user.permissions[0].permisos.split(' - ');
  const idUser = req.user.idUser;

  if(!modelType){
    return res
    .status(400)
    .json({ message: `El parametro modelType es obligatorio`, code: 400 });
  }

  const requiredPermissions=[];
  if(modelType.toUpperCase() == 'ADOPTION'){
    requiredPermissions=['WRITE_PUBLICACION_ADOPCION','READ_PUBLICACION_ADOPCION'];
  }else{
    requiredPermissions=['WRITE_PUBLICACION_BUSQUEDA','READ_PUBLICACION_BUSQUEDA'];
  }

  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  let publication = await getPublicationById(idPublication, modelType);
  if (!publication[0]) {
    return res
      .status(404).json({message: `No se ha podido encontrar la publicacion de Id: '${idPublication}'.`,});
  }

  if (!hasAllPermissions && publication[0].idUser != idUser) {
    return res.status(403).json({ message: "No se cuenta con todos los permisos necesarios" });
  }

 
  
  try {
    checkParameters(req.body,modelType);
    

    publication = await updatePublication(req.body, idPublication, modelType);

    return res
      .status(200)
      .json({ message: "Se ha modificado la publicacion Correctamente" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


export async function postSolvePublication(req, res) {
  const { idPublication } = req.params;
  const { modelType } = req.query;


  if(!modelType){
    return res
    .status(400)
    .json({ message: `El parametro modelType es obligatorio`, code: 400 });
  }

  console.debug(`Iniciado proceso de resolucion de publicacion - Parametros modelType='${modelType}', idPublication= '${idPublication}'`);

  try {
   let publication =  await closePublication( idPublication, modelType, req.body);

    return res
      .status(200)
      .json({
        message:
          "Se ha resuelto correctamente la publicacion de la mascota",
          publication: publication
      });
  } catch (error) {
    if(error.code){
      return res.status(error.code).json({
        message: error.message,
      });
    }else{
      res.status(500).json({
        message: error.message,
      });
    }

  }
}




function checkParameters(publicationDto,modelType ){
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  

  /* TODO: 
  const imagesRegex = "";
  if(!dateRegex.test(req.body.images)){
    throw new Error(`Error en el formato del nombre de las imagenes asociadas, validar servicio de amazon cloud.`);
  }
  */

  if(!publicationDto.idPetType || !publicationDto.idLocality || !publicationDto.idPetColor ){
    throw new Error(
      `Error en el atributos de las relaciones de la publicacion, esperados: petTypee, petColor y Locality. Valores obtenidos: petType: ${publicationDto.idPetType}, petColor: ${publicationDto.idPetColor}, Locality:${publicationDto.idLocality}.`
    );
  }

  switch (modelType.toUpperCase()) {
    case "SEARCH":
      if (!dateRegex.test(publicationDto.lostDate)) {
        throw new Error(
          `Error en el formato del campo lostDate, el formato esperado es AAAA-mm-dd. valor recibido: '${publicationDto.lostDate}'.`
        );
      }

      return true;

    case "ADOPTION":
      return true;
  }
}
