import { User } from "../../models/User.js";
import { UserRole } from "../../models/UserRole.js";
import { getUserStateByName } from "./userState.service.js";
import { createStateUser } from "./stateUser.service.js";
import { sequelize } from "../../database/database.js";
import { getRoleByName, getRolesByPermission } from "./role.service.js";
import { createUserRole } from "./userRole.service.js";
import bcrypt from "bcryptjs";
import { UserState } from "../../models/UserState.js";
import { Role } from "../../models/Role.js";
import { Document } from "../../models/Document.js";

export async function createUser(data) {
  const {
    mail,
    password,
    userName,
    name,
    image,
    userType,
    documents,
    serviceType,
    address,
    phoneNumber,
    cuitCuil,
    birthDate,
  } = data;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create(
      { mail, password: hashedPassword, userName, name, image,address,phoneNumber,cuitCuil,birthDate },
      { fields: ["mail", "password", "userName", "image", "address",,"phoneNumber","cuitCuil","birthDate"] }
    );

    const idUser = newUser.idUser;

    let role;
    if (userType == "ESTABLECIMIENTO") {
      switch (serviceType) {
        case "VETERINARIA":
          role = await getRoleByName("VETERINARIA");
          break;
        case "PETSHOP":
          role = await getRoleByName("PETSHOP");
          break;
        case "REFUGIO":
          role = await getRoleByName("REFUGIO");
          break;
        default:
          role = await getRoleByName("ESTABLECIMIENTO");
          break;
      }

      for (const document of documents) {
        const title = document.title;
        const file = document.file;
        await Document.create(
          { idUser, title, file },
          { fields: ["idUser", "title", "file"] }
        );
      }

      const userState = await getUserStateByName("EN REVISION");
      await createStateUser(idUser, userState[0].idUserState);
    } else {
      role = await getRoleByName("BÁSICO");
      const userState = await getUserStateByName("ACTIVO");
      await createStateUser(idUser, userState[0].idUserState);
    }

    await createUserRole(idUser, role[0].idRole);

    return newUser;
  } catch (error) {
    console.log("Error creating user: %s, error: ", userName, error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const query = `
    SELECT users.idUser, users.mail, users.userName, userStates.userStateName, roles.roleName, users.image
    FROM users
    INNER JOIN (
      SELECT idUser, idUserState
      FROM stateUsers
      where active = true
    ) AS ultimosEstados ON users.idUser = ultimosEstados.idUser
    INNER JOIN userStates ON ultimosEstados.idUserState = userStates.idUserState
    INNER JOIN (
      SELECT idUser, idRole
      FROM userRoles 
      where active = true
    ) AS ultimosRoles ON users.idUser = ultimosRoles.idUser
    INNER JOIN roles ON ultimosRoles.idRole = roles.idRole
    WHERE userStates.userStateName = 'ACTIVO' and roles.roleName = 'BÁSICO'
    `;

    const users = await sequelize.query(query, {
      model: User,
      mapToModel: true,
    });

    return users;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(idUser) {
  try {
    const query = `
    SELECT idUser, mail, userName, name, lastName, image,address,phoneNumber,cuitCuil,birthDate
    FROM users
    WHERE idUser = '${idUser}'
    `;
    const user = await sequelize.query(query, {
      model: User,
      mapToModel: true,
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUserPassword(idUser) {
  try {
    const query = `
    SELECT password
    FROM users
    WHERE idUser = '${idUser}'
    `;

    const user = await sequelize.query(query, {
      model: User,
      mapToModel: true,
    });

    return user[0].password;
  } catch (error) {
    throw error;
  }
}

export async function getUserByMail(mail) {
  try {
    const query = `
      SELECT idUser, mail, validated, password, image,address,phoneNumber,cuitCuil,birthDate
      FROM users
      WHERE mail = '${mail}'
      `;

    const user = await sequelize.query(query, {
      model: User,
      mapToModel: true,
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function getPermissionsForUser(idUser) {
  try {
    const query = `
      SELECT GROUP_CONCAT(p.tokenClaim SEPARATOR ' - ') AS permissions
      FROM users AS u
      JOIN userroles AS ur ON u.idUser = ur.idUser
      JOIN roles AS r ON r.idRole = ur.idRole
      JOIN rolepermissions AS rp ON r.idRole = rp.idRole
      JOIN permissions AS p ON p.idPermission = rp.idPermission
      WHERE u.idUser = '${idUser}' and ur.active = true
      `;

    const user = await sequelize.query(query, {
      model: User,
      mapToModel: true,
    });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getStateForUser(idUser) {
  try {
    const query = `
      select state.*  
      from userstates as state 
      join stateusers change_state on change_state.idUserState = state.idUserState
      join users u on u.idUser = change_state.idUser
      where u.idUser= '${idUser}' and change_state.active = 1 
      order by change_state.createdAt desc 
      limit 1;
      `;

    const user = await sequelize.query(query, {
      model: UserState,
      mapToModel: true,
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function getEveryUsers() {
  try {
    const query = `
    SELECT users.idUser, users.mail, users.userName, userStates.userStateName, roles.roleName, users.image
    FROM users
    INNER JOIN (
      SELECT idUser, idUserState
      FROM stateUsers
      where active = true
    ) AS ultimosEstados ON users.idUser = ultimosEstados.idUser
    INNER JOIN userStates ON ultimosEstados.idUserState = userStates.idUserState
    INNER JOIN (
      SELECT idUser, idRole
      FROM userRoles 
      where active = true
    ) AS ultimosRoles ON users.idUser = ultimosRoles.idUser
    INNER JOIN roles ON ultimosRoles.idRole = roles.idRole
    `;

    const users = await sequelize.query(query, {
      model: User,
      mapToModel: true,
    });

    return users;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(idUser, data) {
  const {
    userName,
    name,
    password,
    phoneNumber,
    birthDate,
    address,
    image,
    blockedReason,
    blocked,
  } = data;

  try {
    const updates = {};
    const updateOptions = { where: { idUser } };

    if (blocked) {
      updates.blocked = blocked;
    }

    if (blockedReason) {
      updates.blockedReason = blockedReason;
    }

    if (userName) {
      updates.userName = userName;
    }

    if (name) {
      updates.name = name;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    if (phoneNumber) {
      updates.phoneNumber = phoneNumber;
    }

    if (birthDate) {
      updates.birthDate = birthDate;
    }

    if (address) {
      updates.address = address;
    }


    if (image) {
      updates.image = image;
    }

    updates.updatedDate = new Date();

    await User.update(updates, updateOptions);
    console.debug(
      "usuario: ",
      idUser,
      "modificado correctamente con : ",
      updates
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function userValidate(idUser) {
  try {
    await User.update(
      { validated: true, updatedDate: new Date() },
      { where: { idUser }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function destroyUser(mail) {
  try {
    await User.destroy({
      where: { mail },
      force: true,
    });

    return;
  } catch (error) {
    throw error;
  }
}

export async function getUsersByPermission(tokenClaim) {
  tokenClaim = tokenClaim.toUpperCase();

  try {
    const roleIds = await getRolesByPermission(tokenClaim).map(
      (role) => role.idRole
    );
    if (!roleIds || roleIds.length === 0) {
      throw {
        message: "No se encontraron roles con el permiso especificado",
        code: 400,
      };
    }

    const users = await User.findAll({
      attributes: ["idUser", "username", "image", "name", "mail","address","phoneNumber","cuitCuil","birthDate"],
      group: ["idUser"],
      include: [
        {
          model: UserRole,
          attributes: ["idRole", "idUser"],
          where: {
            idRole: roleIds,
          },
        },
      ],
    });

    const formattedUsers = users.map((user) => user.get({ plain: true }));

    return formattedUsers;
  } catch (error) {
    console.log(
      "error en la obtencion de usuarios para el permiso:",
      permission,
      error
    );
    throw error;
  }
}

export async function getUsersBylocality(idLocality) {
  try {
    const users = await User.findAll({
      attributes: ["idUser", "username", "image", "name", "mail","address","phoneNumber","cuitCuil","birthDate"],
      where: { idLocality: idLocality, idLocality },
    });
    const formattedUsers = users.map((user) => user.get({ plain: true }));

    return formattedUsers;
  } catch (error) {
    console.log(
      "error en la obtencion de usuarios por localidad, para localidad:",
      idLocality,
      error
    );
    throw error;
  }
}

export async function getUsersByRole(roleName) {
  roleName = roleName.toUpperCase();
  try {
    const users = await User.findAll({
      attributes: ["idUser", "username", "image", "name", "mail","address","phoneNumber","cuitCuil","birthDate"],
      group: ["idUser"],
      include: [
        {
          model: UserRole,
          limit: 1,
          attributes: ["idRole", "idUser"],
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Role,
              attributes: ["idRole", "roleName"],
              where: { roleName: roleName },
            },
          ],
        },
      ],
    });
    const formattedUsers = users.map((user) => user.get({ plain: true }));

    return formattedUsers;
  } catch (error) {
    console.log(
      "error en la obtencion de usuarios para el rol:",
      roleName,
      error
    );
    throw error;
  }
}
