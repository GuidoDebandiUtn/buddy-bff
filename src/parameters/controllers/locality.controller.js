import {
  createLocality,
  deleteLocality,
  getAllLocalities,
  getLocalityById,
  getLocalityByName,
  updateLocality,
} from "../services/locality.service.js";

export async function localityCreate(req, res) {
  const { localityName, idRegion } = req.body;
  console.log(localityName, idRegion);
  try {
    const duplicate = await getLocalityByName(localityName.toUpperCase());

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe una localidad con ese nombre" });
    }

    const locality = await createLocality(localityName.toUpperCase(), idRegion);

    return res.status(201).json({ locality });
  } catch (error) {
    res.status(500).json({
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
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getLocality(req, res) {
  const { idLocality } = req.params;
  try {
    const locality = await getLocalityById(idLocality);

    if (!locality) {
      return res
        .status(404)
        .json({ message: "No existe ninguna localidad con este id" });
    }

    return res.status(200).json({ locality });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function localityUpdate(req, res) {
  const { localityName } = req.body;
  const { idLocality } = req.params;
  try {
    const locality = await getLocalityById(idLocality);

    if (!locality) {
      return res
        .status(404)
        .json({ message: "No existe ninguna localidad con este id" });
    }
    const duplicate = await getLocalityByName(localityName.toUpperCase());

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe una localidad con ese nombre" });
    }

    await updateLocality(idLocality, localityName.toUpperCase());

    return res
      .status(200)
      .json({ message: "Se ha actulizado correctamente la localidad" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function localityDelete(req, res) {
  const { idLocality } = req.params;
  try {
    const locality = await getAllLocalities(idLocality);

    if (!locality) {
      return res
        .status(404)
        .json({ message: "No existe ninguna localidad con este id" });
    }

    await deleteLocality(idLocality);

    return res.status(200).json({ message: "Se ha dado de baja la localidad" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
