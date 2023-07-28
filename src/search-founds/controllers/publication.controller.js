import {
    retrivePaginatedPublications
  } from "../services/publication.service.js";


export async function getPublications(req, res) {
    const { page, size, modelType } = req.body;

  try {
    const data = await retrivePaginatedPublications(page,size, modelType);

    if (!data) {
      return res
        .status(404)
        .json({ message: "Error retriving publications" });
    }

    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  
}