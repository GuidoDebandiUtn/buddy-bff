import { User } from "../../models/User.js";

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
    return newUser;
  } catch (error) {
    if (error.errors[0].path == "mail") {
      throw new Error("mail");
    } else {
      throw new Error(error);
    }
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
    user.destroy({
      where: { idUser },
    });
  } catch (error) {
    console.error(error);
  }
}
