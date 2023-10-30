import { Role } from "../../models/Role.js";
import { sequelize } from "../../database/database.js";

export async function createRole(data) {
  const { roleName, roleDescription, adminRole } = data;
  try {
    const role = await Role.create(
      {
        roleName: roleName.toUpperCase(),
        roleDescription,
        adminRole,
      },
      {
        fields: ["roleName", "roleDescription", "adminRole"],
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
        SELECT roles.idRole, roles.roleName, GROUP_CONCAT(permissions.tokenClaim SEPARATOR ' - ') AS permissions, roles.active
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

export async function getEveryRol() {
  try {
    const query = `
        SELECT roles.idRole, roles.roleName, GROUP_CONCAT(permissions.tokenClaim SEPARATOR ' - ') AS permissions, roles.active
        FROM roles
        LEFT JOIN rolePermissions ON roles.idRole = rolePermissions.idRole
        LEFT JOIN permissions ON rolePermissions.idPermission = permissions.idPermission
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
    SELECT roles.idRole, roles.roleName, roles.roleDescription
    FROM roles
    WHERE roles.idRole = '${idRole}'
    GROUP BY roles.idRole, roles.roleName`;

    let role = await sequelize.query(query, {
      model: Role,
      mapToModel: true,
    });

    const permissions = await getPermissionsForRole(idRole);

    console.log(`Obtenidos los siguientes permisos para el rol: ${permissions}`);
    
    // Acceder a los valores del modelo utilizando dataValues
    role = role[0].dataValues;

    // Asignar el atributo permissions al objeto role
    role.permissions = permissions;

    console.log(`rol: ${role}`);

    return role;
  } catch (error) {
    throw error;
  }
}



export async function getPermissionsForRole(idRole) {
  try {
    const query = `
      SELECT p.tokenclaim AS permissions
      FROM roles AS r
      JOIN rolepermissions AS rp ON r.idRole = rp.idRole
      JOIN permissions AS p ON p.idPermission = rp.idPermission
      WHERE r.idRole = '${idRole}'
      `;

    const role = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    const permissionsArray = [];
    role.map((role) => permissionsArray.push(role.permissions));

    return permissionsArray;
  } catch (error) {
    console.log(error);
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
  const { roleName, roleDescription, adminRole } = data;

  try {
    const updates = {};
    const updateOptions = { where: { idRole } };

    if (roleName) {
      updates.roleName = roleName.toUpperCase();
    }

    if (roleDescription) {
      updates.roleDescription = roleDescription;
    }

    if (adminRole) {
      updates.adminRole = adminRole;
    }

    await Role.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}

export async function deleteRole(idRole) {
  try {
    await Role.update(
      { active: false },
      { where: { idRole }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function activeRole(idRole) {
  try {
    await Role.update({ active: true }, { where: { idRole }, returning: true });

    return;
  } catch (error) {
    throw error;
  }
}

export async function getRoleByUser(idUser) {
  try {
    const query = `
      SELECT *
      FROM roles
      JOIN users 
      ON users.idRole = roles,idRole
      WHERE users.idUser = ${idUser}`;

    const role = await sequelize.query(query, {
      model: Role,
      mapToModel: true,
    });

    return role;
  } catch (error) {
    throw error;
  }
}

export async function getRolesByPermission(tokenClaim) {
  try {
    const query = `
      SELECT roles.* 
      FROM roles
      JOIN rolepermissions ON rolepermissions.idRole= roles.idRole
      JOIN permissions ON rolepermissions.idPermission = permissions.idPermission
      WHERE  permissions.tokenclaim = '${tokenClaim}'
      `;

    const roles = await sequelize.query(query, {
      model: Role,
      mapToModel: true,
    });

    const formattedRoles = roles.map(role => role.get({ plain: true }));

    return formattedRoles;

  } catch (error) {
    throw error;
  }
}
