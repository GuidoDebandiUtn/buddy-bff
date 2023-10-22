import {
  activeProvince,
  createProvince,
  deleteProvince,
  getAllProvinces,
  getEveryProvinces,
  getProvinceById,
  getProvinceByName,
  updateProvince,
} from "../services/province.service.js";
import { getCountryById } from "../services/country.service.js";

export async function provinceCreate(req, res) {
  const userPermissions = req.user.permissions;
  const requiredPermissions = ["WRITE_PROVINCE"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  const country = await getCountryById(req.body.idCountry);

  if (!country[0]) {
    return res
      .status(404)
      .json({ message: "No existe ningún país con ese id" });
  }

  try {
    let province;
    const duplicate = await getProvinceByName(
      req.body.provinceName,
      req.body.idCountry
    );

    if (duplicate[0]) {
      province = await activeProvince(duplicate[0].idCountry);
      return res.status(201).json({ message: "Se ha reactivado la provincia" });
    } else {
      province = await createProvince(req.body);
      return res.status(201).json({ province });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getProvinces(req, res) {
  const userPermissions = req.user.permissions;
  const requiredPermissions = ["READ_PROVINCE"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
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

export async function getProvincesEvery(req, res) {
  const userPermissions = req.user.permissions;
  const requiredPermissions = ["READ_PROVINCE_LIST", "READ_PARAMETROS"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const provinces = await getEveryProvinces();

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
  const userPermissions = req.user.permissions;
  const requiredPermissions = ["READ_PROVINCE"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const province = await getProvinceById(idProvince);

    if (!province[0]) {
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
  const userPermissions = req.user.permissions;
  const requiredPermissions = ["WRITE_PROVINCE"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const province = await getProvinceById(idProvince);

    if (!province[0]) {
      return res
        .status(400)
        .json({ message: "No existe ninguna provincia con este id" });
    }
    console.log(province[0].idCountry);
    const duplicate = await getProvinceByName(
      req.body.provinceName,
      province[0].idCountry
    );

    if (duplicate[0]) {
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
  const userPermissions = req.user.permissions;
  const requiredPermissions = ["WRITE_PROVINCE"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const province = await getProvinceById(idProvince);

    if (!province[0]) {
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

export async function provinceActive(req, res) {
  const { idProvince } = req.params;
  const userPermissions = req.user.permissions;
  const requiredPermissions = ["WRITE_PROVINCE"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const province = await getProvinceById(idProvince);

    if (!province[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna provincia con este id" });
    }

    await activeProvince(idProvince);

    return res
      .status(200)
      .json({ message: "Se ha dado de alta correctamente la provincia" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
