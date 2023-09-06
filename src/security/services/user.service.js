import { User } from "../../models/User.js";
import { getUserStateByName } from "./userState.service.js";
import { createStateUser } from "./stateUser.service.js";
import { sequelize } from "../../database/database.js";
import { getRoleByName } from "./role.service.js";
import { createUserRole } from "./userRole.service.js";

export async function createUser(data) {
  const { mail, password, userName } = data;

  try {
    const newUser = await User.create(
      {
        mail,
        password,
        userName,
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        fields: ["mail", "password", "userName", "createdDate", "updatedDate"],
      }
    );

    const userState = await getUserStateByName("ACTIVO");

    await createStateUser(newUser.idUser, userState[0].idUserState);

    const role = await getRoleByName("BÁSICO");

    console.log();
    role[0].idRole;

    await createUserRole(newUser.idUser, role[0].idRole);

    return newUser;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const query = `
    SELECT users.mail, users.userName
    FROM users
    INNER JOIN (
      SELECT idUser, idUserState, MAX(createdDate) AS ultimaFecha
      FROM stateUsers 
      GROUP BY idUser
    ) AS ultimosEstados ON users.idUser = ultimosEstados.idUser
    INNER JOIN userStates ON ultimosEstados.idUserState = userStates.idUserState
    INNER JOIN (
      SELECT idUser, idRole, MAX(createdDate) AS ultimaFecha
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
  } = data;

  try {
    const updates = {};
    const updateOptions = { where: { idUser } };

    if (userName) {
      updates.userName = userName;
    }

    if (name) {
      updates.name = name;
    }

    if (password) {
      updates.password = password;
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
  } catch (error) {
    throw error;
  }
}
