import { getIdToken } from "../helpers/authHelper.js";
import { validateMail } from "../helpers/mailHelper.js";
import { changeStateUser } from "../services/stateUser.service.js";
import {
  createUser,
  destroyUser,
  getAllUsers,
  getUserById,
  getUserByMail,
  updateUser,
} from "../services/user.service.js";
import { getUserStateByName } from "../services/userState.service.js";

export async function userCreate(req, res) {
  const data = req.body;

  try {
    const user = await getUserByMail(data.mail);

    if (user) {
      return res
        .status(400)
        .json({ message: "Este mail ya se necuentra en uso" });
    }

    const newUser = await createUser(data);

    await validateMail(newUser.userName, newUser.mail, newUser.idUser);

    return res
      .status(201)
      .json({ message: "Se creó correctamente el ususario" });
  } catch (error) {
    await destroyUser(data.mail);
    res.status(500).json({
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
    res.status(500).json({ error: error.message });
  }
}

export async function getUser(req, res) {
  const { idUser } = req.params;

  try {
    const user = await getUserById(idUser);

    if (!user[0]) {
      return res.status(404).json({
        message: "No se encuentra ningun usuario con ese id",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function userUpdate(req, res) {
  const { idUser } = req.params;

  try {
    const user = await getUserById(idUser);

    if (!user[0]) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese id",
      });
    }

    await updateUser(idUser, req.body);

    res
      .status(200)
      .json({ message: "Se ha actualizado correctamente el usuario" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    await changeStateUser(idUser, userState.idUserState, idUserAuthor);

    res.status(200).json({ message: "El usuario se ha dado de baja" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    await changeStateUser(idUser, userState.idUserState, idUserAuthor);

    res.status(200).json({ message: "Se ha cambiado el estado del usuario" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function changePassword(req, res) {
  const { idUser } = req.params;

  try {
    const user = await getUserById(idUser);

    if (!user[0]) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese id",
      });
    }

    await updateUser(idUser, req.body);

    res.status(200).json({ message: "Se ha actualizado la contraseña" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
