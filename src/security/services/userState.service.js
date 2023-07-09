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
    console.error(error);
  }
}

export async function getAllUserState() {
  try {
    const userStates = await UserState.findAll();
    return userStates;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserStateById(idUserState) {
  try {
    const userState = await UserState.findByPk(idUserState);
    return userState;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserStateByName(userStateName) {
  try {
    const userState = await UserState.findOne({ where: { userStateName } });
    return userState;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserState(userState, userStateName) {
  try {
    userState.userStateName = userStateName.toUpperCase();
    userState.updatedDate = new Date();
    await userState.save();
    return userState;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUserState(userState) {
  try {
    userState.active = false;
    userState.updatedDate = new Date();
    await userState.save();
    return userState;
  } catch (error) {
    console.error(error);
  }
}
