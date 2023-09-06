import { RolePermission } from "../../models/RolePermission.js";

export async function createRolePermission(idRole, idPermission) {
  try {
    const newRolePermission = await RolePermission.create(
      {
        createdDate: new Date(),
        updatedDate: new Date(),
        active: true,
        idPermission,
        idRole,
      },
      {
        fields: ["createdDate", "updatedDate", "idPermission", "idRole"],
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
