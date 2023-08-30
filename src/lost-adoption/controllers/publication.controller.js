import {
    retrivePaginatedPublications,
    createSearch,
    publicationDelete,
    getPublicationById,
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


export async function postSearch(req, res) {
 
  try {
      const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
      if (!req.body.lostDate || !dateRegex.test(req.body.lostDate)) {
        return res.status(400).json({ message: "Invalid format for lostDate" });
      }
    const publication = await createSearch(req.body);

    return res.status(201).json(publication);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


export async function postAdoption(req, res) {
 
  try {
      const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
      if (!req.body.lostDate || !dateRegex.test(req.body.lostDate)) {
        return res.status(400).json({ message: "Invalid format for lostDate" });
      }
    const publication = await createSearch(req.body);

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
  try {

    const publication = await getPublicationById(idPublication,modelType);


    if (!publication) {
      return res
        .status(404)
        .json({ message: "No existe se ha podido encontrar la publicacion a eliminar" });
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


