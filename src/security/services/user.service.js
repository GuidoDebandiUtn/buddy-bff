import { User } from "../../models/User.js";
import { getUserStateByName } from "./userState.service.js";
import { addStateUser, createStateUser } from "./stateUser.service.js";
import { StateUser } from "../../models/StateUser.js";
import { UserState } from "../../models/UserState.js";

export async function createUser(userData) {
  const { mail, password, userName, name, lastName } = userData;
  try {
    let newUser = await User.create(
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
    const stateUser = await createStateUser();
    await addStateUser(stateUser, newUser.idUser, userState.idUserState);
    return newUser;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllUsers() {
  try {
    const users = await User.findAll({
      atributes: [
        "idUser",
        "mail",
        "username",
        "name",
        "lastName",
        "createdDate",
      ],
      include: [
        {
          model: StateUser,
          include: [
            {
              model: UserState,
            },
          ],
        },
      ],
    });
    return users;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserById(idUser) {
  try {
    const user = await User.findByPk(idUser);
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserByMail(mail) {
  try {
    const user = await User.findOne({ where: { mail } });
    return user;
  } catch (error) {
    console.error(error);
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
    console.error(error);
  }
}

export async function deleteUser(idUser) {
  try {
    User.destroy({ where: { idUser } });
    return;
  } catch (error) {
    console.error(error);
  }
}
