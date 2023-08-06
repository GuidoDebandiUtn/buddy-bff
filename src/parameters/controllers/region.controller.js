import { getProvinceById } from "../services/province.service.js";
import {
  createRegion,
  deleteRegion,
  getAllRegions,
  getRegionById,
  getRegionByName,
  updateRegion,
} from "../services/region.service.js";

export async function regionCreate(req, res) {
  try {
    const duplicate = await getRegionByName(req.body.regionName);

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe una region con ese nombre" });
    }

    const province = await getProvinceById(req.body.idProvince);

    if (!province) {
      return res
        .status(404)
        .json({ message: "No existe ninguna provincia con ese id" });
    }

    const region = await createRegion(req.body);

    return res.status(201).json({ region });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getRegions(req, res) {
  try {
    const regions = await getAllRegions();

    if (!regions[0]) {
      return res.status(404).json({ message: "No existe ninguna region" });
    }

    return res.status(200).json({ regions });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getRegion(req, res) {
  const { idRegion } = req.params;
  try {
    const region = await getRegionById(idRegion);

    if (!region) {
      return res
        .status(404)
        .json({ message: "No existe ninguna region con este id" });
    }

    return res.status(200).json({ region });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function regionUpdate(req, res) {
  const { idRegion } = req.params;

  try {
    const region = await getRegionById(idRegion);

    if (!region) {
      return res
        .status(404)
        .json({ message: "No existe ninguna region con este id" });
    }

    const duplicate = await getRegionByName(req.body.regionName);

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe una region con ese nombre" });
    }

    await updateRegion(req.body, idRegion);

    return res
      .status(200)
      .json({ message: "Se ha actulizado correctamente la region" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function regionDelete(req, res) {
  const { idRegion } = req.params;
  try {
    const region = await getRegionById(idRegion);

    if (!region) {
      return res
        .status(404)
        .json({ message: "No existe ninguna region con este id" });
    }

    await deleteRegion(idRegion);

    return res.status(200).json({ message: "Se ha dado de baja la region" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
