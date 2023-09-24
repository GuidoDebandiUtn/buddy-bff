import { User } from "../../models/User.js";
import { getUserStateByName } from "./userState.service.js";
import { createStateUser } from "./stateUser.service.js";
import { sequelize } from "../../database/database.js";
import { getRoleByName } from "./role.service.js";
import { createUserRole } from "./userRole.service.js";
import bcrypt from "bcryptjs";
import { getStateForUser, getUserById } from "./user.service.js";


export async function getAllEstablishments() {
  try {
    const query = `
      SELECT users.idUser, users.mail, users.userName
      FROM users
      INNER JOIN (
        SELECT idUser, idUserState, MAX(createdAt) AS ultimaFecha
        FROM stateUsers 
        GROUP BY idUser
      ) AS ultimosEstados ON users.idUser = ultimosEstados.idUser
      INNER JOIN userStates ON ultimosEstados.idUserState = userStates.idUserState
      INNER JOIN (
        SELECT idUser, idRole, MAX(createdAt) AS ultimaFecha
        FROM userRoles 
        GROUP BY idUser
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

export async function getEstablishmentById(idUser) {
  try {
    const query = `
      SELECT idUser, mail, userName
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
export async function validateEstablishment(idUser, validateDto) {

    const userRevision = await getUserById(idUser);

    if(!userRevision){
      throw new Error("Error obteniendo el usuario para validacion");
    }
      
    const userState= await getStateForUser(userRevision.idUser);

    if(!userState){
      throw new Error("Error obteniendo el estado del usuario");
    }

    if(!userState.userStateName == 'EN REVISION'){
      throw new Error("El usuario no esta esperando revision");
    }
    

    if(validateDto.approved){
      const activeState = await getUserStateByName('ACTIVO');
      //TODO invalidar stateUser anterior
    }


  //acualizar fecha de vencimiento de cada documento



  //enviar mail al user con el resultado
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
