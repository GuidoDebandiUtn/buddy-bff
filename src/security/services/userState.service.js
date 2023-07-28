import { UserState } from "../../models/UserState.js";

export async function createUserState(userStateName) {
  userStateName = userStateName.toUpperCase();
  try {
    const userState = await UserState.create(
      {
        userStateName,
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
    const userStates = await UserState.findAll({
      where: { active: true },
      attributes: ["userStateName"],
    });

    return userStates;
  } catch (error) {
    throw error;
  }
}

export async function getUserStateById(idUserState) {
  try {
    const userState = await UserState.findByOne({ where: { idUserState } });

    return userState;
  } catch (error) {
    throw error;
  }
}

export async function getUserStateByName(userStateName) {
  try {
    const userState = await UserState.findOne({
      where: { userStateName },
      attributes: ["idUserState", "userStateName"],
    });

    return userState;
  } catch (error) {
    throw error;
  }
}

export async function updateUserState(idUserState, userStateName) {
  try {
    await UserState.update(
      { userStateName: userStateName, updatedDate: new Date() },
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
