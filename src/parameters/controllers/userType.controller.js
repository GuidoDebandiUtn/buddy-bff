import {
  createUserType,
  deleteUserType,
  getAllUserTypes,
  getUserTypeById,
  getUserTypeByName,
  updateUserType,
} from "../services/userType.service.js";

export async function userTypeCreate(req, res) {
  try {
    const duplicate = await getUserTypeByName(req.body.userTypeName);

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe un tipo de usuario con este nombre" });
    }

    const userType = await createUserType(req.body);

    return res.status(201).json({ userType });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getUserTypes(req, res) {
  try {
    const userTypes = await getAllUserTypes();

    if (!userTypes) {
      return res.status(404).json({ message: "No existen tipos de usuario" });
    }

    return res.status(200).json({ userTypes });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getUserType(req, res) {
  const { idUserType } = req.params;

  try {
    const userType = await getUserTypeById(idUserType);

    if (!userType) {
      return res
        .status(404)
        .json({ message: "No existe un tipo de usuario con este id" });
    }

    return res.status(200).json({ userType });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function userTypeUpdate(req, res) {
  const { idUserType } = req.params;

  try {
    const userType = await getUserTypeById(idUserType);

    if (!userType) {
      return res
        .status(404)
        .json({ message: "No existe un tipo de usuario con este id" });
    }

    const duplicate = await getUserTypeByName(req.body.userTypeName);

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe un tipo de usuario con este nombre" });
    }

    await updateUserType(req.body, idUserType);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente el tipo de usuario" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function userTypeDelete(req, res) {
  const { idUserType } = req.params;

  try {
    const userType = await getUserTypeById(idUserType);

    if (!userType) {
      return res
        .status(404)
        .json({ message: "No existe un tipo de usuario con este id" });
    }

    await deleteUserType(idUserType);

    return res.status(200).json({
      message: "Se ha dade de baja correctamente el tipo de usuario",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
