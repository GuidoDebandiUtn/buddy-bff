import { User } from "../../models/User.js";
import { getUserStateByName } from "./userState.service.js";
import { createStateUser } from "./stateUser.service.js";
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
      attributes: ["mail", "userName", "name", "lastName"],
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
      attributes: ["idUser", "mail", "userName", "name", "lastName"],
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
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(user, userData) {
  const { userName, name, lastName, password } = userData;
  try {
    if (userName) {
      user.userName = userName;
    }
    if (name) {
      user.name = name;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (password) {
      user.password = password;
    }
    user.updatedDate = new Date();
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

export async function userValidate(user) {
  try {
    user.validated = true;
    user.updatedDate = new Date();
    await user.save();
    return;
  } catch (error) {
    throw error;
  }
}
