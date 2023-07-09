import { StateUser } from "../../models/StateUser.js";

export async function createStateUser() {
  try {
    const newStateUser = await StateUser.create(
      {
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        fields: ["createdDate", "updatedDate"],
      }
    );
    return newStateUser;
  } catch (error) {
    console.error(error);
  }
}

export async function addStateUser(stateUser, idUser, idUserState) {
  try {
    stateUser.userIdUser = idUser;
    stateUser.userStateIdUserState = idUserState;
    await stateUser.save();
    return;
  } catch (error) {
    console.error(error);
  }
}
