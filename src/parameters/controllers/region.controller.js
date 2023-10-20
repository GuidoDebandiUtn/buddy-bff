import { getProvinceById } from "../services/province.service.js";
import {
  activeRegion,
  createRegion,
  deleteRegion,
  getAllRegions,
  getEveryRegions,
  getRegionById,
  getRegionByName,
  updateRegion,
} from "../services/region.service.js";

export async function regionCreate(req, res) {
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_REGION',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  const province = await getProvinceById(req.body.idProvince);

  if (!province[0]) {
    return res
      .status(404)
      .json({ message: "No existe ninguna provincia con ese id" });
  }

  try {
    let region;
    const duplicate = await getRegionByName(
      req.body.regionName,
      req.body.idProvince
    );

    if (duplicate[0]) {
      region = await activeRegion(duplicate[0].idRegion);
      return res.status(201).json({message:"Se ha reactivado el departamento" });
    }else{
      region = await createRegion(req.body);
      return res.status(201).json({ region });
    }



    

    
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getRegions(req, res) {
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['READ_REGION',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const regions = await getAllRegions();

    if (!regions[0]) {
      return res.status(404).json({ message: "No existe ninguna region" });
    }

    return res.status(200).json({ regions });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getRegionsEvery(req, res) {
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['READ_REGION_LIST',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const regions = await getEveryRegions();

    if (!regions[0]) {
      return res.status(404).json({ message: "No existe ninguna region" });
    }

    return res.status(200).json({ regions });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getRegion(req, res) {
  const { idRegion } = req.params;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['READ_REGION',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const region = await getRegionById(idRegion);

    if (!region[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna region con este id" });
    }

    return res.status(200).json({ region });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function regionUpdate(req, res) {
  const { idRegion } = req.params;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_REGION',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const region = await getRegionById(idRegion);

    if (!region[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna region con este id" });
    }

    const duplicate = await getRegionByName(
      req.body.regionName,
      region[0].idProvince
    );

    if (duplicate[0]) {
      return res
        .status(400)
        .json({ message: "Ya existe una region con ese nombre" });
    }

    await updateRegion(req.body, idRegion);

    return res
      .status(200)
      .json({ message: "Se ha actulizado correctamente la region" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function regionDelete(req, res) {
  const { idRegion } = req.params;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_REGION',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const region = await getRegionById(idRegion);

    if (!region[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna region con este id" });
    }

    await deleteRegion(idRegion);

    return res.status(200).json({ message: "Se ha dado de baja la region" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function regionActive(req, res) {
  const { idRegion } = req.params;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_REGION',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const region = await getRegionById(idRegion);

    if (!region[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna region con este id" });
    }

    await activeRegion(idRegion);

    return res
      .status(200)
      .json({ message: "Se ha dado de alta correctamente la region" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
