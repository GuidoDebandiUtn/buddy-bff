import { UpdateUserDto, UserDto } from "../dtos/userDto.js";
import { getIdToken } from "../helper/authHelper.js";
import { changeStateUser } from "../services/stateUser.service.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/user.service.js";
import { getUserStateByName } from "../services/userState.service.js";

export async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    // const usersDto = users.map((user) => new UserDto(user.mail, user.userName));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUser(req, res) {
  const { idUser } = req.params;
  try {
    const user = await getUserById(idUser);
    if (user) {
      // const userDto = new UserDto(user.mail, user.userName);
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "No se encuentra ningun usuario con ese id",
      });
    }
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

    const updatedUser = await updateUser(user, userData);
    const updatedUserDto = new UpdateUserDto(
      updatedUser.userName,
      updatedUser.name,
      updatedUser.lastName,
      updatedUser.updatedDate
    );
    res.status(200).json(updatedUserDto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function userDelete(req, res) {
  const { idUser } = req.params;
  const token = req.header("auth-token");
  try {
    const user = await getUserById(idUser);
    if (!user) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese id",
      });
    }
    const userState = await getUserStateByName("inactive".toUpperCase());
    if (!userState) {
      return res.status(404).json({
        message: "No existe ningun UserState con ese nombre",
      });
    }
    const idUserAuthor = await getIdToken(token);
    await deleteUser(idUser, userState.idUserState, idUserAuthor);
    res.status(200).json({ message: "El usuario se ha dado de baja" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function changeState(req, res) {
  const { idUser, userStateName } = req.params;
  const token = req.header("auth-token");
  try {
    const idUserAuthor = await getIdToken(token);
    const userState = await getUserStateByName(userStateName.toUpperCase());
    await changeStateUser(idUser, userState.idUserState, idUserAuthor);
    res.status(200).json({ message: "Se ha cambiado el estado del usuario" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
