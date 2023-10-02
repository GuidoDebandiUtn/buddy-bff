import { User } from "../../models/User.js";
import { UserRole } from "../../models/UserRole.js";
import { getUserStateByName } from "./userState.service.js";
import { createStateUser } from "./stateUser.service.js";
import { sequelize } from "../../database/database.js";
import { getRoleByName } from "./role.service.js";
import { createUserRole } from "./userRole.service.js";
import bcrypt from "bcryptjs";
import { UserState } from "../../models/UserState.js";
import { StateUser } from "../../models/StateUser.js";
import { Role } from "../../models/Role.js";

export async function createUser(data) {
  const { mail, password, userName, name, userType } = data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    log.debug(
      "Hased password for user %s, original: %s, hashed: %s",
      userName,
      password,
      hashedPassword
    );
    const newUser = await User.create(
      {
        mail,
        password: hashedPassword,
        userName,
      },
      {
        fields: ["mail", "password", "userName"],
      }
    );

    const userState = await getUserStateByName("ACTIVO");

    await createStateUser(newUser.idUser, userState[0].idUserState);

    let role;
    if (userType == "BASICO") {
      role = await getRoleByName("BÁSICO");
    } else {
      role = await getRoleByName("ESTABLECIMIENTO");
    }


    await createUserRole(newUser.idUser, role[0].idRole);

    return newUser;
  } catch (error) {
    console.error("Error creating user: %s, error: ", userName, error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const query = `
    SELECT users.idUser, users.mail, users.userName, userStates.userStateName
    FROM users
    INNER JOIN (
      SELECT idUser, idUserState, MAX(createdAt) AS ultimaFecha
      FROM stateUsers 
      GROUP BY idUser
    ) AS ultimosEstados ON users.idUser = ultimosEstados.idUser
    INNER JOIN userStates ON ultimosEstados.idUserState = userStates.idUserState
    INNER JOIN (
      SELECT idUser, idRole, MAX(createdAt) AS ultimaFecha
      FROM userRoles 
      GROUP BY idUser
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
    SELECT idUser, mail, userName,name,lastName
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
      SELECT idUser, mail, validated, password
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
      SELECT GROUP_CONCAT(p.tokenClaim SEPARATOR ' - ') AS permisos
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
      select state.*  from userstates as state 
      join stateusers change_sate on change_sate.idUserState = state.idUserState
      join users u on u.idUser = change_sate.idUser
      where u.idUser= '${idUser}' and change_sate.active = 1 
      order by change_sate.createdAt desc 
      limit 1;`;

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
    SELECT users.idUser, users.mail, users.userName, userStates.userStateName
    FROM users
    INNER JOIN (
      SELECT idUser, idUserState, MAX(createdAt) AS ultimaFecha
      FROM stateUsers 
      GROUP BY idUser
    ) AS ultimosEstados ON users.idUser = ultimosEstados.idUser
    INNER JOIN userStates ON ultimosEstados.idUserState = userStates.idUserState
    INNER JOIN (
      SELECT idUser, idRole, MAX(createdAt) AS ultimaFecha
      FROM userRoles 
      GROUP BY idUser
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
    lastName,
    password,
    phoneNumber,
    dni,
    birthDate,
    address,
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

    if (dni) {
      updates.dni = dni;
    }

    if (address) {
      updates.address = address;
    }

    if (lastName) {
      updates.lastName = lastName;
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



export async function getUsersByRole(roleName) {
  roleName = roleName.toUpperCase();
  try {
    const users = await User.findAll({
      attributes: ['idUser', 'username', 'image','name','mail'],
      group: ['idUser'],
      include: [{
        model: UserRole,
        limit: 1,
        attributes: ["idRole","idUser"],
        order: [['createdAt', 'DESC']], 
        include: [{
          model: Role,
          attributes: ["idRole","roleName"],
          where: { roleName: roleName },
        },],
      },],
    });
    const formattedUsers = users.map(user => user.get({ plain: true }));

    return formattedUsers;
  } catch (error) {
    console.log("error en la obtencion de usuarios para el rol:",roleName,error)
    throw error;
  }
}