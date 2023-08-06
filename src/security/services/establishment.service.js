import { User } from "../../models/User.js";
import { getUserStateByName } from "./userState.service.js";
import { createStateUser } from "./stateUser.service.js";
import { getUserTypeByName } from "../../parameters/services/userType.service.js";
import { sequelize } from "../../database/database.js";

export async function createEstablishment(data) {
  const { mail, userName, password } = data;

  try {
    const userType = await getUserTypeByName("ESTABLECIMIENTO");

    const newEstablishment = await User.create(
      {
        mail,
        password,
        userName,
        createdDate: new Date(),
        updatedDate: new Date(),
        idUserType: userType.idUserType,
      },
      {
        fields: [
          "mail",
          "password",
          "userName",
          "createdDate",
          "updatedDate",
          "idUserType",
        ],
      }
    );

    const userState = await getUserStateByName("EN REVISIÓN");

    await createStateUser(newEstablishment.idUser, userState.idUserState);

    return newEstablishment;
  } catch (error) {
    throw error;
  }
}

export async function getAllEstablishments() {
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
      INNER JOIN userTypes ON users.idUserType = userTypes.idUserType
      WHERE userStates.userStateName IN ('ACTIVO','EN REVISIÓN') and userTypes.userTypeName = "ESTABLECIMIENTO"
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

export async function getEstablishmentById(idUser) {
  try {
    const query = `
      SELECT users.idUser, users.mail, users.userName
      FROM users
      INNER JOIN (
        SELECT idUser, idUserState, MAX(createdDate) AS ultimaFecha
        FROM stateUsers 
        GROUP BY idUser
      ) AS ultimosEstados ON users.idUser = ultimosEstados.idUser
      INNER JOIN userStates ON ultimosEstados.idUserState = userStates.idUserState
      INNER JOIN userTypes ON users.idUserType = userTypes.idUserType
      WHERE userStates.userStateName IN ('ACTIVO','EN REVISIÓN') and userTypes.userTypeName = 'ESTABLECIMIENTO' and users.idUser = '${idUser}'
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

export async function getEstablishmentByMail(mail) {
  try {
    const user = await User.findOne({
      attributes: ["idUser", "mail", "userName", "validated"],
      where: { mail },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function updateEstablishment(idUser, userData) {
  const { userName, password, phoneNumber, address } = userData;

  try {
    const updates = {};
    const updateOptions = { where: { idUser } };

    if (userName) {
      updates.userName = userName;
    }

    if (password) {
      updates.password = password;
    }

    if (phoneNumber) {
      updates.phoneNumber = phoneNumber;
    }

    if (address) {
      updates.address = address;
    }

    updates.updatedDate = new Date();

    await User.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}
