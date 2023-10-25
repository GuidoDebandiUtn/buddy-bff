import { StateUser } from "../../models/StateUser.js";
import log  from "../../helpers/loggerHelper.js";

export async function createStateUser(idUser, idUserState, idUserAuthor) {
  let idAuthor;

  if (idUserAuthor) {
    idAuthor = idUserAuthor;
  } else {
    idAuthor = idUser;
  }

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
    log('debug',`ejecucion de changeStateUser() con idUser: ${idUser},  idUserState:${idUserState}`);
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
