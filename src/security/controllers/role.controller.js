import {
  activeRole,
  createRole,
  deleteRole,
  getAllRole,
  getRoleById,
  getRoleByName,
  updateRole,
} from "../services/role.service.js";

export async function roleCreate(req, res) {
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
  try {
    const roles = await getAllRole();

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

  try {
    const role = await getRoleById(idRole);

    if (!role[0]) {
      return res.status(404).json({
        message: "No existe ningun role con ese id",
      });
    }

    return res.status(200).json(role);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function roleUpdate(req, res) {
  const { idRole } = req.params;
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
