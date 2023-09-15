import { UserRole } from "../../models/UserRole.js";

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
        createdDate: new Date(),
        updatedDate: new Date(),
        idUser,
        idRole,
      },
      {
        fields: [
          "idUserAuthor",
          "createdDate",
          "updatedDate",
          "idUser",
          "idRole",
        ],
      }
    );

    return newUserRole;
  } catch (error) {
    throw error;
  }
}

export async function changeUserRole(idUser, idRole, idUserAuthor) {
  try {
    const userRole = await UserRole.findOne({
      where: {
        idUser,
      },
      order: [["createdDate", "DESC"]],
    });

    userRole.updatedDate = new Date();

    await userRole.save();

    await createUserRole(idUser, idRole, idUserAuthor);

    return;
  } catch (error) {
    throw error;
  }
}
