import {
  activePetType,
  createPetType,
  deletePetType,
  getAllPetTypes,
  getEveryPetTypes,
  getPetTypeById,
  getPetTypeByName,
  updatePetType,
} from "../services/petType.service.js";

export async function petTypeCreate(req, res) {
  const userPermissions = req.user.permissions;
  const requiredPermissions = ["WRITE_MI_MASCOTA_TYPE"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    let petType;
    const duplicate = await getPetTypeByName(req.body.petTypeName);

    if (duplicate[0]) {
      petType = await activePetType(duplicate[0].idPetType);
      return res
        .status(201)
        .json({ message: "Se ha reactivado el tipo de Animal" });
    } else {
      petType = await createPetType(req.body);
      return res.status(201).json({ petType });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getPetTypes(req, res) {
  const userPermissions = req.user.permissions;
  const requiredPermissions = ["READ_PET_TYPE_LIST"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const petTypes = await getAllPetTypes();

    if (!petTypes[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun tipo de mascota" });
    }

    return res.status(200).json({ petTypes });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getPetTypesEvery(req, res) {
  const userPermissions = req.user.permissions;
  const requiredPermissions = ["READ_MI_MASCOTA_TYPE_LIST", "READ_PARAMETROS"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const petTypes = await getEveryPetTypes();

    if (!petTypes[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun tipo de mascota" });
    }

    return res.status(200).json({ petTypes });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getPetType(req, res) {
  const { idPetType } = req.params;
  const userPermissions = req.user.permissions;
  const requiredPermissions = ["READ_MI_MASCOTA_TYPE"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const petType = await getPetTypeById(idPetType);

    if (!petType[0]) {
      return res
        .status(404)
        .json({ message: "No existe el tipo de mascota con ese id" });
    }

    return res.status(200).json({ petType });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function petTypeUpdate(req, res) {
  const { idPetType } = req.params;
  const userPermissions = req.user.permissions;
  const requiredPermissions = ["WRITE_MI_MASCOTA_TYPE"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const petType = await getPetTypeById(idPetType);

    if (!petType[0]) {
      return res
        .status(404)
        .json({ message: "No existe el tipo de mascota con ese id" });
    }

    const duplicate = await getPetTypeByName(req.body.petTypeName);

    if (duplicate[0]) {
      return res
        .status(400)
        .json({ message: "Ya existe un Tipo de mascota con este nombre" });
    }

    await updatePetType(req.body, idPetType);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente el tipo de mascota" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function petTypeDelete(req, res) {
  const { idPetType } = req.params;
  const userPermissions = req.user.permissions;
  const requiredPermissions = ["WRITE_MI_MASCOTA_TYPE"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const petType = await getPetTypeById(idPetType);

    if (!petType[0]) {
      return res
        .status(404)
        .json({ message: "No existe el tipo de mascota con ese id" });
    }

    await deletePetType(idPetType);

    return res
      .status(200)
      .json({ message: "Se ha dado de baja correctamente el tipo de mascota" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function petTypeActive(req, res) {
  const { idPetType } = req.params;
  const userPermissions = req.user.permissions;
  const requiredPermissions = ["WRITE_MI_MASCOTA_TYPE"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const petType = await getPetTypeById(idPetType);

    if (!petType[0]) {
      return res
        .status(404)
        .json({ message: "No existe el tipo de mascota con ese id" });
    }

    await activePetType(idPetType);

    return res
      .status(200)
      .json({ message: "Se ha dado de alta correctamente el tipo de mascota" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
