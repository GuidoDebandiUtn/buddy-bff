import { UserRole } from "../../models/UserRole.js";
import log  from "../../helpers/loggerHelper.js";

export async function createUserRole(idUser, idRole, idUserAuthor) {
  let idAuthor;

  if (idUserAuthor) {
    idAuthor = idUserAuthor;
  } else {
    idAuthor = idUser;
  }

  try {
    const newUserRole = await UserRole.create(
      {
        idUserAuthor: idAuthor,
        idUser,
        idRole,
      },
      {
        fields: ["idUserAuthor", "idUser", "idRole"],
      }
    );

    return newUserRole;
  } catch (error) {
    log('error',`error creando el nuevo rol del usuario: '${idUser}'`);
    throw error;
  }
}

export async function changeUserRole(idUser, idRole, idUserAuthor) {
  try {
    const userRole = await UserRole.findOne({
      where: {
        idUser,
      },
      order: [["createdAt", "DESC"]],
    });

    userRole.active = false;

    await userRole.save();

    await createUserRole(idUser, idRole, idUserAuthor);

    return;
  } catch (error) {
    throw error;
  }
}
