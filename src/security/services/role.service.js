import { Role } from "../../models/Role.js";
import { sequelize } from "../../database/database.js";

export async function createRole(data) {
  const { roleName, roleDescription } = data;
  try {
    const role = await Role.create(
      {
        roleName: roleName.toUpperCase(),
        roleDescription,
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        fields: [
          "roleName",
          "roleDescription",
          "active",
          "createdDate",
          "updatedDate",
        ],
      }
    );

    return role;
  } catch (error) {
    throw error;
  }
}

export async function getAllRoles() {
  try {
    const query = `
        SELECT roles.idRole, roles.roleName, GROUP_CONCAT(permissions.tokenClaim) AS permisos
        FROM roles
        LEFT JOIN rolePermissions ON roles.idRole = rolePermissions.idRole
        LEFT JOIN permissions ON rolePermissions.idPermission = permissions.idPermission
        WHERE roles.active = true
        GROUP BY roles.idRole, roles.roleName`;

    const roles = await sequelize.query(query, {
      model: Role,
      mapToModel: true,
    });

    return roles;
  } catch (error) {
    throw error;
  }
}

export async function getRoleById(idRole) {
  try {
    const query = `
      SELECT roles.idRole, roles.roleName, GROUP_CONCAT(permissions.tokenClaim) AS permisos
      FROM roles
      LEFT JOIN rolePermissions ON roles.idRole = rolePermissions.idRole
      LEFT JOIN permissions ON rolePermissions.idPermission = permissions.idPermission
      WHERE roles.idRole = "${idRole}"
      GROUP BY roles.idRole, roles.roleName`;

    const role = await sequelize.query(query, {
      model: Role,
      mapToModel: true,
    });

    return role;
  } catch (error) {
    throw error;
  }
}

export async function getRoleByName(roleName) {
  try {
    const query = `
      SELECT idRole, roleName
      FROM roles
      WHERE roles.roleName = "${roleName}"`;

    const role = await sequelize.query(query, {
      model: Role,
      mapToModel: true,
    });

    return role;
  } catch (error) {
    throw error;
  }
}

export async function updateRole(data, idRole) {
  const { roleName, roleDescription } = data;

  try {
    const updates = {};
    const updateOptions = { where: { idRole } };

    if (roleName) {
      updates.roleName = roleName.toUpperCase();
    }

    if (roleDescription) {
      updates.roleDescription = roleDescription;
    }

    updates.updatedDate = new Date();

    await Role.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}

export async function deleteRole(idRole) {
  try {
    await Role.update(
      { active: false, updatedDate: new Date() },
      { where: { idRole: idRole }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function activeRole(idRole) {
  try {
    await Role.update(
      { active: true, updatedDate: new Date() },
      { where: { idRole: idRole }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
