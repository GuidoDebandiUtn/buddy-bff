import {
  createLocality,
  deleteLocality,
  getAllLocalities,
  getLocalityById,
  getLocalityByName,
  updateLocality,
} from "../services/locality.service.js";
import { getRegionById } from "../services/region.service.js";

export async function localityCreate(req, res) {
  try {
    const duplicate = await getLocalityByName(req.body.localityName);

    if (duplicate[0]) {
      return res
        .status(400)
        .json({ message: "Ya existe una localidad con ese nombre" });
    }

    const region = await getRegionById(req.body.idRegion);

    if (!region[0]) {
      return res
        .status(400)
        .json({ message: "Ya existe una localidad con ese nombre" });
    }

    const locality = await createLocality(req.body);

    return res.status(201).json({ locality });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getLocalities(req, res) {
  try {
    const localities = await getAllLocalities();

    if (!localities[0]) {
      return res.status(404).json({ message: "No existe ninguna localidad" });
    }

    return res.status(200).json({ localities });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getLocality(req, res) {
  const { idLocality } = req.params;
  try {
    const locality = await getLocalityById(idLocality);

    if (!locality[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna localidad con este id" });
    }

    return res.status(200).json({ locality });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function localityUpdate(req, res) {
  const { idLocality } = req.params;
  try {
    const locality = await getLocalityById(idLocality);

    if (!locality[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna localidad con este id" });
    }
    const duplicate = await getLocalityByName(req.body.localityName);

    if (duplicate[0]) {
      return res
        .status(400)
        .json({ message: "Ya existe una localidad con ese nombre" });
    }

    await updateLocality(req.body, idLocality);

    return res
      .status(200)
      .json({ message: "Se ha actulizado correctamente la localidad" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function localityDelete(req, res) {
  const { idLocality } = req.params;
  try {
    const locality = await getLocalityById(idLocality);

    if (!locality[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna localidad con este id" });
    }

    await deleteLocality(idLocality);

    return res.status(200).json({ message: "Se ha dado de baja la localidad" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
