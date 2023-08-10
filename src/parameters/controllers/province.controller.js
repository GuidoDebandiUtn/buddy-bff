import {
  createProvince,
  deleteProvince,
  getAllProvinces,
  getProvinceById,
  getProvinceByName,
  updateProvince,
} from "../services/province.service.js";
import { getCountryById } from "../services/country.service.js";

export async function provinceCreate(req, res) {
  try {
    const duplicate = await getProvinceByName(req.body.provinceName);

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe una provincia con este nombre" });
    }

    const country = await getCountryById(req.body.idCountry);

    if (!country) {
      return res
        .status(404)
        .json({ message: "No existe ningún país con ese nombre" });
    }

    const province = await createProvince(req.body);

    return res.status(201).json({ province });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getProvinces(req, res) {
  try {
    const provinces = await getAllProvinces();

    if (!provinces[0]) {
      return res.status(404).json({ message: "No existe ninguna provincia" });
    }

    return res.status(200).json({ provinces });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getProvince(req, res) {
  const { idProvince } = req.params;

  try {
    const province = await getProvinceById(idProvince);

    if (!province) {
      return res
        .status(404)
        .json({ message: "No existe ninguna provincia con este id" });
    }

    return res.status(200).json({ province });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function provinceUpdate(req, res) {
  const { idProvince } = req.params;
  const { provinceName } = req.body;

  try {
    const province = await getProvinceById(idProvince);

    if (!province) {
      return res
        .status(400)
        .json({ message: "No existe ninguna provincia con este id" });
    }

    const duplicate = await getProvinceByName(req.body.provinceName);

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe una provincia con este nombre" });
    }

    await updateProvince(req.body, idProvince);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente la provincia" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function provinceDelete(req, res) {
  const { idProvince } = req.params;

  try {
    const province = await getProvinceById(idProvince);

    if (!province) {
      return res
        .status(404)
        .json({ message: "No existe ninguna provincia con este id" });
    }

    await deleteProvince(idProvince);

    return res.status(200).json({ message: "Se dio de baja la provincia" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
