import { getUserById } from "../../security/services/user.service.js";
import {
    retrivePaginatedPublications,
    createSearch,
    publicationDelete,
    getPublicationById,
    createAdoption,
    updatePublication,
    getPublicationsByUser,
  } from "../services/publication.service.js";


export async function getPublications(req, res) {
    const {  modelType ,page, size,} = req.query;

  try {
    const data = await retrivePaginatedPublications(page,size, modelType);

    if (!data) {
      return res
        .status(404)
        .json({ message: "Error retriving publications" });
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

}

export async function obtainPublicationsByUser(req,res){
  const { idUser } = req.params;

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
  try {
    let publication;
    if (req.body.lostDate || checkParameters('SEARCH',req.body)) {
      publication = await createSearch(req.body);
    }

    return res.status(201).json(publication);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


export async function postAdoption(req, res) {
  try {
    const publication = await createAdoption(req.body);

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
  console.log(`Iniciado proceso de eliminacion de publicacion - Parametros modelType='${modelType}', idPublication= '${idPublication}'`);
  try {
    const publication = await getPublicationById(idPublication,modelType);
    console.log(`publicacion obtenida correctamente. entidad obtenida: '${publication}'`);
    if (!publication) {
      return res
        .status(404)
        .json({ message: `No se ha podido encontrar la publicacion a eliminar` });
    }

    await publicationDelete(idPublication,modelType);

    return res
      .status(200)
      .json({ message: "Se ha dado de baja correctamente la publicacion de la mascota" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}



export async function putPublication(req, res) {
  const { modelType } = req.query;
  const { idPublication } = req.params;
  
  checkParameters(req.body,modelType);

  try {
    let publication = await getPublicationById(idPublication,modelType);
    if (!publication) {
      return res
        .status(404)
        .json({ message: `No se ha podido encontrar la publicacion de Id: '${idPublication}'.` });
    }
   publication = await updatePublication(req.body,idPublication,modelType);

    return res.status(200).json({message: "Se ha modificado la publicacion Correctamente"});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
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

  switch(modelType.toUpperCase()){
   case "SEARCH":
      if(!dateRegex.test(publicationDto.lostDate)){
        throw new Error(`Error en el formato del campo lostDate, el formato esperado es AAAA-mm-dd HH-mm-ss. valor recibido: '${req.body.lostDate}'.`);
      }
    
   return true;
   
   
   
   case "ADOPTION":
    
   return true;
  }


}