import {
  activePermission,
  createPermission,
  deletePermission,
  getAllPermission,
  getPermissionById,
  getPermissionByName,
  updatePermission,
} from "../services/permission.service.js";

export async function permissionCreate(req, res) {
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_ROLES',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const permission = await getPermissionByName(req.body.permissionName);

    if (permission[0]) {
      return res.status(400).json({
        message: "Ya existe un permiso con ese nombre",
      });
    }

    const newPermission = await createPermission(req.body);

    return res.status(201).json(newPermission);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getPermissions(req, res) {
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['READ_ROLES',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const permissions = await getAllPermission();

    if (!permissions[0]) {
      return res.status(404).json({ message: "No existe ningun permiso" });
    }

    return res.status(200).json(permissions);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getPermission(req, res) {
  const { idPermission } = req.params;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['READ_ROLES',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const permission = await getPermissionById(idPermission);

    if (!permission[0]) {
      return res.status(404).json({
        message: "No existe ningun permiso con ese id",
      });
    }

    return res.status(200).json(permission);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function permissionUpdate(req, res) {
  const { idPermission } = req.params;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_ROLES',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const permission = await getPermissionById(idPermission);

    if (!permission[0]) {
      return res.status(404).json({
        message: "No existe ningun permiso con ese id",
      });
    }

    const duplicate = await getPermissionByName(req.body.permissionName);

    if (duplicate[0]) {
      return res.status(400).json({
        message: "Ya existe un permiso con ese nombre",
      });
    }

    await updatePermission(req.body, idPermission);

    return res
      .status(200)
      .json({ message: "Se ha actualizado el permiso correctamente" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function permissionDelete(req, res) {
  const { idPermission } = req.params;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_ROLES',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const permission = await getPermissionById(idPermission);
    if (!permission[0]) {
      return res.status(404).json({
        message: "No existe ningun permiso con ese id",
      });
    }
    await deletePermission(idPermission);
    return res.status(200).json({ message: "Se ha dado de baja este permiso" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function permissionActive(req, res) {
  const { idPermission } = req.params;
  const userPermissions = req.user.permissions[0].permissions.split(' - ');
  const requiredPermissions=['WRITE_ROLES',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const permission = await getPermissionById(idPermission);

    if (!permission[0]) {
      return res.status(404).json({
        message: "No existe ningun permiso con ese id",
      });
    }

    await activePermission(idPermission);

    return res.status(200).json({ message: "Se ha dado de alta este permiso" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
