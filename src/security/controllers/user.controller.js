import { getIdToken } from "../helpers/authHelper.js";
import { resetPasswordMail } from "../helpers/mailHelper.js";
import { changeStateUser } from "../services/stateUser.service.js";
import {
  getAllUsers,
  getUserById,
  getUserByMail,
  updateUser,
} from "../services/user.service.js";
import { getUserStateByName } from "../services/userState.service.js";

export async function getUsers(req, res) {
  try {
    const users = await getAllUsers();

    if (!users) {
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

    if (!user) {
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

    if (!user) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese id",
      });
    }

    const userData = req.body;

    await updateUser(idUser, userData);

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

    if (!user) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese id",
      });
    }

    const userState = await getUserStateByName("inactive".toUpperCase());

    const idUserAuthor = await getIdToken(req.header("auth-token"));

    await changeState(idUser, userState.idUserState, idUserAuthor);

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

    if (!user) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese id",
      });
    }

    const exist = await getUserById(idUser);

    if (!exist) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese id",
      });
    }

    const userState = await getUserStateByName(userStateName.toUpperCase());

    await changeStateUser(idUser, userState.idUserState, idUserAuthor);

    res.status(200).json({ message: "Se ha cambiado el estado del usuario" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function resetPassword(req, res) {
  const { mail } = req.body;

  try {
    const exist = await getUserByMail(mail);

    if (!user) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese usuario",
      });
    }

    const user = await getUserById(exist.idUser);

    await resetPasswordMail(user.userName, user.mail, user.idUser);

    res.status(200).json({ message: "Se ha enviado el mail" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function changePassword(req, res) {
  const { idUser } = req.params;

  try {
    const user = await getUserById(idUser);

    if (!user) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese id",
      });
    }

    await updateUser(idUser, req.body);

    res.status(200).json({ message: "Se ha actulizado la contraseña" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
