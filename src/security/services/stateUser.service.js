import { StateUser } from "../../models/StateUser.js";

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
        createdDate: new Date(),
        updatedDate: new Date(),
        idUser,
        idUserState,
      },
      {
        fields: [
          "idUserAuthor",
          "createdDate",
          "updatedDate",
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
        userIdUser: idUser,
      },
      order: [["createdDate", "DESC"]],
    });

    state.updatedDate = new Date();

    await state.save();

    await createStateUser(idUser, idUserState, idUserAuthor);

    return;
  } catch (error) {
    throw error;
  }
}
