import { User } from "../../models/User.js";
import { getUserStateByName } from "./userState.service.js";
import { createStateUser } from "./stateUser.service.js";
import { StateUser } from "../../models/StateUser.js";
import { UserState } from "../../models/UserState.js";

export async function createUser(data) {
  const { mail, password, userName, name, lastName } = data;

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
    console.log(newUser.idUser, userState.idUserState);

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

export async function updateUser(idUser, userData) {
  const { userName, name, lastName, password } = userData;

  try {
    const updates = {};
    const updateOptions = { where: { idUser } };

    if (userName) {
      updates.userName = userName;
    }

    if (name) {
      updates.name = name;
    }

    if (password) {
      updates.password = password;
    }

    if (lastName) {
      updates.lastName = lastName;
    }

    updates.updatedDate = new Date();

    await User.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}

export async function userValidate(idUser) {
  try {
    await User.update(
      { validated: true, updatedDate: new Date() },
      { where: { idUser }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function destroyUser(mail) {
  try {
    await User.destroy({
      where: { mail },
      force: true,
    });
  } catch (error) {
    throw error;
  }
}
