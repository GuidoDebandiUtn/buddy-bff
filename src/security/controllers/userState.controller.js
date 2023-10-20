import {
  activeUserState,
  createUserState,
  deleteUserState,
  getAllUserState,
  getUserStateById,
  getUserStateByName,
  updateUserState,
} from "../services/userState.service.js";

export async function userStateCreate(req, res) {

  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_USUARIOS',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const userState = await getUserStateByName(req.body.userStateName);

    if (userState[0]) {
      return res.status(400).json({
        message: "Ya existe un UserState con ese nombre",
      });
    }

    const newUserState = await createUserState(req.body);

    return res.status(201).json(newUserState);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getUserStates(req, res) {
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['READ_USUARIOS',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const userStates = await getAllUserState();

    if (!userStates[0]) {
      return res.status(404).json({ message: "No existe ningun UserState" });
    }

    return res.status(200).json(userStates);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getUserState(req, res) {
  const { idUserState } = req.params;
  
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['READ_USUARIOS',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const userState = await getUserStateById(idUserState);

    if (!userState[0]) {
      return res.status(404).json({
        message: "No existe ningun UserState con ese id",
      });
    }

    return res.status(200).json(userState);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function userStateUpdate(req, res) {
  const { idUserState } = req.params;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_USUARIOS',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const userState = await getUserStateById(idUserState);

    if (!userState[0]) {
      return res.status(404).json({
        message: "No existe ningun UserState con ese id",
      });
    }

    const duplicate = await getUserStateByName(req.body.userStateName);

    if (duplicate[0]) {
      return res.status(400).json({
        message: "Ya existe un UserState con ese nombre",
      });
    }

    await updateUserState(req.body, idUserState);

    return res
      .status(200)
      .json({ message: "Se ha actualizado el UserState correctamente" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function userStateDelete(req, res) {
  const { idUserState } = req.params;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_USUARIOS',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const userState = await getUserStateById(idUserState);
    if (!userState[0]) {
      return res.status(404).json({
        message: "No existe ningun UserState con ese id",
      });
    }
    await deleteUserState(idUserState);
    return res
      .status(200)
      .json({ message: "Se ha dado de baja este UserState" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function userStateActive(req, res) {
  const { idUserState } = req.params;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_USUARIOS',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const userState = await getUserStateById(idUserState);

    if (!userState[0]) {
      return res.status(404).json({
        message: "No existe ningun UserState con ese id",
      });
    }

    await activeUserState(idUserState);

    return res
      .status(200)
      .json({ message: "Se ha dado de alta este UserState" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
