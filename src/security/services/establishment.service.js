import { User } from "../../models/User.js";
import { Document } from "../../models/Document.js";
import { getUserStateByName } from "./userState.service.js";
import { sequelize } from "../../database/database.js";
import bcrypt from "bcryptjs";
import { destroyUser, getStateForUser, getUserById } from "./user.service.js";
import { changeStateUser } from "./stateUser.service.js";
import { sendValidationUserEmail } from "../../helpers/mailHelper.js";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export async function getAllEstablishments() {
  try {
    const query = `
      SELECT users.idUser, users.mail, users.userName, userStates.userStateName, roles.roleName
      FROM users
      INNER JOIN (
        SELECT idUser, idUserState
        FROM stateUsers
        where active = true
      ) AS ultimosEstados ON users.idUser = ultimosEstados.idUser
      INNER JOIN userStates ON ultimosEstados.idUserState = userStates.idUserState
      INNER JOIN (
        SELECT idUser, idRole
        FROM userRoles 
        where active = true
      ) AS ultimosRoles ON users.idUser = ultimosRoles.idUser
      INNER JOIN roles ON ultimosRoles.idRole = roles.idRole
      WHERE userStates.userStateName IN ('ACTIVO','EN REVISIÓN') and roles.roleName = "ESTABLECIMIENTO"
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

export async function validateEstablishment(idUser, mail, validateDto) {
  try {
    const approvedBoolean =
      validateDto.approved.toUpperCase() == "TRUE" ? true : false;

    if (approvedBoolean) {
      const activeState = await getUserStateByName("ACTIVO");

      if (!activeState[0]) {
        throw new {
          message: "Error obteniendo el estado de activo para el usuario",
          code: 500,
        }();
      }

      await changeStateUser(
        idUser,
        activeState[0].idUserState,
        validateDto.author.idUser
      );
      for (let document of validateDto.documents) {
        const idDocument = document.idDocument;
        const validDate = document.validDate;

        const partesFecha = validDate.split("-");

        const dia = parseInt(partesFecha[0], 10);
        const mes = parseInt(partesFecha[1], 10);
        const ano = parseInt(partesFecha[2], 10);

        const fechaIngresada = new Date(ano, mes, dia);
        const fechaActual = new Date();

        if (fechaIngresada < fechaActual) {
          throw new {
            message: "Ha ingresado una fecha invalida para un documento",
            code: 400,
          }();
        }

        const updates = {};
        const updateOptions = { where: { idDocument } };

        updates.validDate = `${ano}-${mes}-${dia}`;

        await Document.update(updates, updateOptions);
      }
      await sendValidationUserEmail(
        mail,
        `
      <p>Hola! Nos complace avisarte que tu usuario ha sido validado correctamente por nuestro equipo!</p>

      <p>Ya puedes utilizar la app como mas te guste</p>

      <p>Saludos!</p>
      <p>Equipo de BUDDY!<p>
      `
      );
    } else {
      await Document.destroy({ where: { idUser: idUser }, force: true });
      await destroyUser(mail);
      await sendValidationUserEmail(
        mail,
        `
      <p>Hola!Lamentamos informarte que no ha sido posible validar la informacion brindada para tu establecimiento</p>

      <p>Aunque puedes registrarte de nuevo en el futuro</p>

      <p>Esperamos contar con tu establecimiento pronto. Saludos!</p>
      <p>Equipo de BUDDY!<p>
      `
      );
    }
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
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
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

export async function getEstablishmentsRevision() {
  try {
    const query = `
      SELECT users.idUser, users.mail, users.userName, userStates.userStateName, roles.roleName, users.image
      FROM users
      INNER JOIN (
        SELECT idUser, idUserState
        FROM stateUsers
        where active = true
      ) AS ultimosEstados ON users.idUser = ultimosEstados.idUser
      INNER JOIN userStates ON ultimosEstados.idUserState = userStates.idUserState
      INNER JOIN (
        SELECT idUser, idRole
        FROM userRoles 
        where active = true
      ) AS ultimosRoles ON users.idUser = ultimosRoles.idUser
      INNER JOIN roles ON ultimosRoles.idRole = roles.idRole
      WHERE userStates.userStateName IN ('EN REVISIÓN') and roles.roleName IN ("REFUGIO", "VETERINARIA", "PETSHOP")
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

export async function getEstablishmentDocuments(idUser) {
  try {
    const query = `
      SELECT idDocument, file, title
      FROM documents
      WHERE idUser = '${idUser}'
    `;

    const documents = await sequelize.query(query, {
      model: Document,
      mapToModel: true,
    });

    return documents;
  } catch (error) {
    throw error;
  }
}

export async function getEstablishmentById(idUser) {
  try {
    const query = `
    SELECT idUser, mail, userName, name, lastName, image
    FROM users
    WHERE idUser = '${idUser}'
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
