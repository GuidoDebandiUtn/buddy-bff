import {
  activeRole,
  createRole,
  deleteRole,
  getAllRoles,
  getEveryRol,
  getRoleById,
  getRoleByName,
  updateRole,
} from "../services/role.service.js";
import {
  createRolePermission,
  deleteRolePermission,
  getRolePermission,
} from "../services/rolePermission.service.js";

export async function roleCreate(req, res) {
  const userPermissions = req.user.permissions;
  let requiredPermissions = ["WRITE_ROLES"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const role = await getRoleByName(req.body.roleName);

    if (role[0]) {
      return res.status(400).json({
        message: "Ya existe un rol con ese nombre",
      });
    }

    const newRole = await createRole(req.body);

    return res.status(201).json(newRole);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getRoles(req, res) {
  const userPermissions = req.user.permissions;
  let requiredPermissions = ["READ_ROLES"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const roles = await getAllRoles();

    if (!roles[0]) {
      return res.status(404).json({ message: "No existe ningun rol" });
    }

    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getRole(req, res) {
  const { idRole } = req.params;
  const userPermissions = req.user.permissions;
  let requiredPermissions = ["READ_ROLES"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const role = await getRoleById(idRole);

    if (!role) {
      return res.status(404).json({
        message: "No existe ningun rol con ese id",
      });
    }

    return res.status(200).json(role);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getRoleEvery(req, res) {
  const userPermissions = req.user.permissions;
  const hasAllPermissions = userPermissions.includes("READ_ROLES_LIST");

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const roles = await getEveryRol();

    if (!roles[0]) {
      return res.status(404).json({ message: "No existe ningun rol" });
    }

    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function roleUpdate(req, res) {
  const { idRole } = req.params;
  const userPermissions = req.user.permissions;
  let requiredPermissions = ["WRITE_ROLES"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const role = await getRoleById(idRole);

    if (!role[0]) {
      return res.status(404).json({
        message: "No existe ningun rol con ese id",
      });
    }

    const duplicate = await getRoleByName(req.body.roleName);

    if (duplicate[0]) {
      return res.status(400).json({
        message: "Ya existe un rol con ese nombre",
      });
    }

    await updateRole(req.body, idRole);

    return res
      .status(200)
      .json({ message: "Se ha actualizado el rol correctamente" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function roleDelete(req, res) {
  const { idRole } = req.params;
  const userPermissions = req.user.permissions;
  let requiredPermissions = ["WRITE_ROLES"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const role = await getRoleById(idRole);
    if (!role[0]) {
      return res.status(404).json({
        message: "No existe ningun rol con ese id",
      });
    }
    await deleteRole(idRole);
    return res.status(200).json({ message: "Se ha dado de baja este rol" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function roleActive(req, res) {
  const { idRole } = req.params;
  const userPermissions = req.user.permissions;
  let requiredPermissions = ["WRITE_ROLES"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }
  try {
    const role = await getRoleById(idRole);

    if (!role[0]) {
      return res.status(404).json({
        message: "No existe ningun rol con ese id",
      });
    }

    await activeRole(idRole);

    return res.status(200).json({ message: "Se ha dado de alta este rol" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function addPermission(req, res) {
  const { idRole } = req.params;
  const { idPermission } = req.body;
  const userPermissions = req.user.permissions;
  let requiredPermissions = ["WRITE_ROLES"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const role = await getRoleById(idRole);

    if (!role[0]) {
      return res.status(404).json({
        message: "No existe ningun rol con ese id",
      });
    }

    const rolePermission = await getRolePermission(idRole, idPermission);

    if (rolePermission[0]) {
      return res.status(400).json({
        message: "Este rol ya tiene este permiso",
      });
    }

    await createRolePermission(idRole, idPermission);

    return res
      .status(200)
      .json({ message: "Se ha añadido un permiso a este rol" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function addSeveralPermissions(req, res) {
  const { idRole } = req.params;
  const { permissions } = req.body;
  const userPermissions = req.user.permissions;
  let requiredPermissions = ["WRITE_ROLES"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const role = await getRoleById(idRole);

    if (!role[0]) {
      return res.status(404).json({
        message: "No existe ningun rol con ese id",
      });
    }

    const results = [];

    for (const idPermission of permissions) {
      const rolePermission = await getRolePermission(idRole, idPermission);

      if (!rolePermission[0]) {
        await createRolePermission(idRole, idPermission);
        results.push({ idPermission, success: true });
      } else {
        results.push({ idPermission, success: false });
      }
    }

    return res.status(200).json({ message: "Operación completada", results });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function takePermission(req, res) {
  const { idRole, idPermission } = req.params;
  const userPermissions = req.user.permissions;
  let requiredPermissions = ["WRITE_ROLES"];
  const hasAllPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return res
      .status(403)
      .json({ message: "No se cuenta con todos los permissions necesarios" });
  }

  try {
    const role = await getRoleById(idRole);

    if (!role[0]) {
      return res.status(404).json({
        message: "No existe ningun rol con ese id",
      });
    }

    await deleteRolePermission(idRole, idPermission);

    return res
      .status(200)
      .json({ message: "Se ha quitado un permiso a este rol" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
