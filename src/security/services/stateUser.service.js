import { StateUser } from "../../models/StateUser.js";
import { getStateForUser } from "./user.service.js";

export async function createStateUser(idUser, idUserState, idUserAuthor) {
  let idAuthor;

  if (idUserAuthor) {
    idAuthor = idUserAuthor;
  } else {
    idAuthor = idUser;
  }

  const lastState = await getStateForUser(idUser);
  await dest

  try {
    const newStateUser = await StateUser.create(
      {
        idUserAuthor: idAuthor,
        idUser,
        idUserState,
      },
      {
        fields: [
          "idUserAuthor",
          "createdAt",
          "updatedAt",
          "idUser",
          "idUserState",
        ],
      }
    );

    return newStateUser;
  } catch (error) {
    throw error;
  }
}

export async function changeStateUser(idUser, idUserState, idUserAuthor) {
  try {
    const state = await StateUser.findOne({
      where: {
        idUser,
      },
      order: [["createdAt", "DESC"]],
    });

    state.active = false;

    await state.save();

    await createStateUser(idUser, idUserState, idUserAuthor);

    return;
  } catch (error) {
    throw error;
  }
}
