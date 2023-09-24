import { Permission } from "../../models/Permission.js";
import { sequelize } from "../../database/database.js";

export async function createPermission(data) {
  const { permissionName, permissionDescription, tokenClaim } = data;
  try {
    const permission = await Permission.create(
      {
        permissionName: permissionName.toUpperCase(),
        permissionDescription,
        tokenClaim,
      },
      {
        fields: [
          "permissionName",
          "permissionDescription",
          "tokenClaim",
          "active",
          "createdAt",
          "updatedAt",
        ],
      }
    );

    return permission;
  } catch (error) {
    throw error;
  }
}

export async function getAllPermission() {
  try {
    const query = `
        SELECT idPermission, permissionName, tokenClaim
        FROM permissions
        WHERE active = true`;

    const permissions = await sequelize.query(query, {
      model: Permission,
      mapToModel: true,
    });

    return permissions;
  } catch (error) {
    throw error;
  }
}

export async function getPermissionById(idPermission) {
  try {
    const query = `
        SELECT idPermission, permissionName, tokenClaim
        FROM permissions
        WHERE idPermission = "${idPermission}"`;

    const permission = await sequelize.query(query, {
      model: Permission,
      mapToModel: true,
    });

    return permission;
  } catch (error) {
    throw error;
  }
}

export async function getPermissionByName(permissionName) {
  try {
    const query = `
        SELECT idPermission, permissionName, tokenClaim
        FROM permissions
        WHERE permissionName = "${permissionName}"`;

    const permission = await sequelize.query(query, {
      model: Permission,
      mapToModel: true,
    });

    return permission;
  } catch (error) {
    throw error;
  }
}

export async function updatePermission(data, idPermission) {
  const { permissionName, permissionDescription, tokenClaim } = data;

  try {
    const updates = {};
    const updateOptions = { where: { idPermission } };

    if (permissionName) {
      updates.permissionName = permissionName.toUpperCase();
    }

    if (permissionDescription) {
      updates.permissionDescription = permissionDescription;
    }

    if (tokenClaim) {
      updates.tokenClaim = tokenClaim;
    }

    updates.updatedDate = new Date();

    await Permission.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}

export async function deletePermission(idPermission) {
  try {
    await Permission.update(
      { active: false, updatedDate: new Date() },
      { where: { idPermission: idPermission }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function activePermission(idPermission) {
  try {
    await Permission.update(
      { active: true, updatedDate: new Date() },
      { where: { idPermission: idPermission }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
