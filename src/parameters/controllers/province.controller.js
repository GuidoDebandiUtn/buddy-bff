import {
  createProvince,
  deleteProvince,
  getAllProvinces,
  getProvinceById,
  getProvinceByName,
  updateProvince,
} from "../services/province.service.js";

export async function provinceCreate(req, res) {
  const { provinceName, idCountry } = req.body;

  try {
    const duplicate = await getProvinceByName(provinceName.toUpperCase());

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe una provincia con este nombre" });
    }

    const province = await createProvince(
      provinceName.toUpperCase(),
      idCountry
    );

    return res.status(201).json({ province });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getProvinces(req, res) {
  try {
    const provinces = await getAllProvinces();

    if (!provinces) {
      return res.status(404).json({ message: "No existe ninguna provincia" });
    }

    return res.status(200).json({ provinces });
  } catch (error) {
    res.status(500).json({
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
    res.status(500).json({
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

    await updateProvince(provinceName.toUpperCase());

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente la provincia" });
  } catch (error) {
    res.status(500).json({
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
    res.status(500).json({
      message: error.message,
    });
  }
}
