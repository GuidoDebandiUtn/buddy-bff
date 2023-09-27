import { RolePermission } from "../../models/RolePermission.js";
import { sequelize } from "../../database/database.js";

export async function createRolePermission(idRole, idPermission) {
  try {
    const newRolePermission = await RolePermission.create(
      {
        active: true,
        idPermission,
        idRole,
      },
      {
        fields: ["createdAt", "updatedAt", "idPermission", "idRole"],
      }
    );

    return newRolePermission;
  } catch (error) {
    throw error;
  }
}

export async function deleteRolePermission(idRole, idPermission) {
  try {
    await RolePermission.destroy({
      where: {
        idRole,
        idPermission,
      },
      force: true,
    });

    return;
  } catch (error) {
    throw error;
  }
}

export async function getRolePermission(idRole, idPermission) {
  try {
    const query = `
        SELECT *
        FROM rolepermissions
        WHERE idRole = '${idRole}' and idPermission = '${idPermission}'`;

    const rp = await sequelize.query(query, {
      model: RolePermission,
      mapToModel: true,
    });

    return rp;
  } catch (error) {
    throw error;
  }
}
