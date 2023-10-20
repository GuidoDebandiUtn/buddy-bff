import { activeCountry } from "../services/country.service.js";
import {
  activeLocality,
  createLocality,
  deleteLocality,
  getAllLocalities,
  getAllLocalitiesEvery,
  getLocalityById,
  getLocalityByName,
  updateLocality,
} from "../services/locality.service.js";
import { getRegionById } from "../services/region.service.js";

export async function localityCreate(req, res) {
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_LOCALITIES',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    let locality;
    const region = await getRegionById(req.body.idRegion);
    if (!region[0]) {
      return res
        .status(400)
        .json({ message: "Ya ha sido posible validar el departamento asociado a la localidad" });
    }

    const duplicate = await getLocalityByName(
      req.body.localityName,
      req.body.idRegion
    );

    if (duplicate[0]) {
      locality = await activeLocality(duplicate[0].idLocality);
      return res.status(201).json({ message: "Se ha reactivado la Localidad" });
    }else{
      locality = await createLocality(req.body);
      return res.status(201).json({ locality });
    }





    

    
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getLocalities(req, res) {
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['READ_LOCALITIES',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
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

export async function getLocalitiesEvery(req, res) {
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['READ_LOCALITIES_LIST',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const localities = await getAllLocalitiesEvery();

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
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['READ_LOCALITIES',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
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
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_LOCALITIES',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const locality = await getLocalityById(idLocality);

    if (!locality[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna localidad con este id" });
    }
    const duplicate = await getLocalityByName(
      req.body.localityName,
      locality[0].idRegion
    );

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
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_LOCALITIES',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
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

export async function localityActive(req, res) {
  const { idLocality } = req.params;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_LOCALITIES',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const locality = await getLocalityById(idLocality);

    if (!locality[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna localidad con este id" });
    }

    await activeLocality(idLocality);

    return res.status(200).json({ message: "Se ha dado de alta la localidad" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
