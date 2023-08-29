import { User } from "../../models/User.js";
import { getUserStateByName } from "./userState.service.js";
import { createStateUser } from "./stateUser.service.js";
import { sequelize } from "../../database/database.js";

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

    await createStateUser(newUser.idUser, userState.idUserState);

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
    WHERE userStates.userStateName = 'ACTIVO' 
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
    SELECT idUser, mail, userName
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
