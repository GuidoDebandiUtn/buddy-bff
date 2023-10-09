import { getIdToken } from "../../helpers/authHelper.js";
import { validateMail } from "../../helpers/mailHelper.js";
import { getRoleByName } from "../services/role.service.js";
import { changeStateUser } from "../services/stateUser.service.js";
import {
  createUser,
  destroyUser,
  getAllUsers,
  getUserById,
  getUserByMail,
  updateUser,
  getUserPassword,
  getPermissionsForUser,
  getEveryUsers,
} from "../services/user.service.js";
import { changeUserRole } from "../services/userRole.service.js";
import { getUserStateByName } from "../services/userState.service.js";

import bcrypt from "bcryptjs";

export async function userCreate(req, res) {
  const data = req.body;

  try {
    const user = await getUserByMail(data.mail);

    if (user[0]) {
      return res
        .status(400)
        .json({ message: "Este mail ya se necuentra en uso" });
    }

    const newUser = await createUser(data);

    console.log(`usuario: ${user[0].mail} creado con exito`);

    await validateMail(newUser.mail, newUser.idUser);

    return res
      .status(201)
      .json({ message: "Se creó correctamente el ususario" });
  } catch (error) {
    await destroyUser(data.mail);
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await getAllUsers();

    if (!users[0]) {
      return res.status(404).json({ message: "No existe ningun usuario" });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getUser(req, res) {
  const userReq = req.user;
  try {
    const user = await getUserById(userReq.idUser);

    if (!user[0]) {
      return res.status(404).json({
        message: "No se encuentra ningun usuario con ese id",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getUserAll(req, res) {
  try {
    const user = await getEveryUsers();

    if (!user[0]) {
      return res.status(404).json({
        message: "No se encuentra ningun usuario ",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function userUpdate(req, res) {
  const { idUser } = req.params;
  const { currentPassword } = req.body;

  try {
    const user = await getUserById(idUser);

    if (!user[0]) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese id",
      });
    }

    const userPassword = await getUserPassword(idUser);

    const passwordMatch = await bcrypt.compare(currentPassword, userPassword);

    if (!passwordMatch) {
      return res.status(400).json({
        error: "Ha habido un problema con la contraseña actual del usuario",
      });
    }

    await updateUser(idUser, req.body);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente el usuario" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function userDelete(req, res) {
  const { idUser } = req.params;

  try {
    const user = await getUserById(idUser);

    if (!user[0]) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese id",
      });
    }

    const userState = await getUserStateByName("INACTIVO");

    const idUserAuthor = await getIdToken(req.header("auth-token"));

    await changeStateUser(idUser, userState[0].idUserState, idUserAuthor);

    return res.status(200).json({ message: "El usuario se ha dado de baja" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function changeState(req, res) {
  const { idUser, userStateName } = req.params;

  try {
    const idUserAuthor = await getIdToken(req.header("auth-token"));

    const user = await getUserById(idUser);

    if (!user[0]) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese id",
      });
    }

    const exist = await getUserById(idUserAuthor);

    if (!exist) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese id",
      });
    }

    const userState = await getUserStateByName(userStateName);

    await changeStateUser(idUser, userState[0].idUserState, idUserAuthor);

    return res
      .status(200)
      .json({ message: "Se ha cambiado el estado del usuario" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function changeRole(req, res) {
  const { idUser, roleName } = req.params;

  try {
    const idUserAuthor = await getIdToken(req.header("auth-token"));

    const user = await getUserById(idUser);

    if (!user[0]) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese id",
      });
    }

    const exist = await getUserById(idUserAuthor);

    if (!exist) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese id",
      });
    }

    const role = await getRoleByName(roleName);

    await changeUserRole(idUser, role[0].idRole, idUserAuthor);

    return res
      .status(200)
      .json({ message: "Se ha cambiado el rol del usuario" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function userPermission(req, res) {
  try {
    const id = await getIdToken(req.header("auth-token"));
    const permissions = await getPermissionsForUser(id);

    if (!permissions[0]) {
      return res.status(404).json({
        message: "No se encuentra ningun permiso",
      });
    }

    return res.status(200).json(permissions[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
