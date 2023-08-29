import { UserState } from "../../models/UserState.js";
import { sequelize } from "../../database/database.js";

export async function createUserState(data) {
  const { userStateName } = data;
  try {
    const userState = await UserState.create(
      {
        userStateName: userStateName.toUpperCase(),
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        fields: ["userStateName", "active", "createdDate", "updatedDate"],
      }
    );

    return userState;
  } catch (error) {
    throw error;
  }
}

export async function getAllUserState() {
  try {
    const query = `
        SELECT idUserState, userStateName
        FROM userStates
        WHERE active = true`;

    const userStates = await sequelize.query(query, {
      model: UserState,
      mapToModel: true,
    });

    return userStates;
  } catch (error) {
    throw error;
  }
}

export async function getUserStateById(idUserState) {
  try {
    const query = `
        SELECT idUserState, userStateName
        FROM userStates
        WHERE idUserState = "${idUserState}"`;

    const userState = await sequelize.query(query, {
      model: UserState,
      mapToModel: true,
    });

    return userState;
  } catch (error) {
    throw error;
  }
}

export async function getUserStateByName(userStateName) {
  try {
    const query = `
        SELECT idUserState, userStateName
        FROM userStates
        WHERE userStateName = "${userStateName}"`;

    const userState = await sequelize.query(query, {
      model: UserState,
      mapToModel: true,
    });

    return userState;
  } catch (error) {
    throw error;
  }
}

export async function updateUserState(data, idUserState) {
  const { userStateName } = data;

  try {
    await UserState.update(
      { userStateName: userStateName.toUpperCase(), updatedDate: new Date() },
      { where: { idUserState: idUserState }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserState(idUserState) {
  try {
    await UserState.update(
      { active: false, updatedDate: new Date() },
      { where: { idUserState: idUserState }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function activeUserState(idUserState) {
  try {
    await UserState.update(
      { active: true, updatedDate: new Date() },
      { where: { idUserState: idUserState }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
