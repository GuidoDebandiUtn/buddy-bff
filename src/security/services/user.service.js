import { User } from "../../models/User.js";
import { getUserStateByName } from "./userState.service.js";
import { changeStateUser, createStateUser } from "./stateUser.service.js";
import { StateUser } from "../../models/StateUser.js";
import { UserState } from "../../models/UserState.js";

export async function createUser(userData) {
  const { mail, password, userName, name, lastName } = userData;
  try {
    const newUser = await User.create(
      {
        mail,
        password,
        userName,
        name,
        lastName,
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        fields: [
          "mail",
          "password",
          "userName",
          "name",
          "lastName",
          "createdDate",
          "updatedDate",
        ],
      }
    );
    const userState = await getUserStateByName("active".toUpperCase());
    await createStateUser(newUser.idUser, userState.idUserState);
    return newUser;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const users = await User.findAll({
      attributes: ["mail", "username", "name", "lastName"],
      include: {
        model: StateUser,
        attributes: ["createdDate", "idStateUser"],
        include: {
          model: UserState,
          attributes: ["userStateName"],
        },
      },
      order: [[StateUser, "createdDate", "DESC"]],
    });
    return users;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(idUser) {
  try {
    const user = await User.findOne({
      where: { idUser },
      attributes: ["idUser", "mail", "username", "name", "lastName"],
      include: {
        model: StateUser,
        attributes: ["createdDate", "idStateUser"],
        include: {
          model: UserState,
          attributes: ["userStateName"],
        },
      },
      order: [[StateUser, "createdDate", "DESC"]],
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUserByMail(mail) {
  try {
    const user = await User.findOne({
      where: { mail },
      attributes: ["idUser", "mail", "validated"],
      include: {
        model: StateUser,
        attributes: ["createdDate"],
        include: {
          model: UserState,
          attributes: ["userStateName"],
        },
      },
      order: [[StateUser, "createdDate", "DESC"]],
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(user, userData) {
  const { password, userName, name, lastName } = userData;
  try {
    if (password) {
      user.password = password;
    }
    if (userName) {
      user.userName = userName;
    }
    if (name) {
      user.name = name;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    user.updatedDate = new Date();
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(idUser, idUserState, idUserAuthor) {
  try {
    await changeStateUser(idUser, idUserState, idUserAuthor);
    return;
  } catch (error) {
    throw error;
  }
}
