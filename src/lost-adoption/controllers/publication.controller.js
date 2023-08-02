import {
    retrivePaginatedPublications,
    createSearch
  } from "../services/publication.service.js";


export async function getPublications(req, res) {
    const { page, size, modelType } = req.query;

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


export async function postSearch(req, res) {
 
  try {
      const lostDateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
      if (!req.body.lostDate || !lostDateRegex.test(req.body.lostDate)) {
        return res.status(400).json({ message: "Invalid format for lostDate" });
      }
    const publication = await createSearch(req.body);

    return res.status(201).json({ publication });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}