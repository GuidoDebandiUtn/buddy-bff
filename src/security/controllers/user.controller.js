import { UpdateUserDto, UserDto } from "../dtos/userDto.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/user.service.js";

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
      const userDto = new UserDto(user.mail, user.userName);
      res.status(200).json(userDto);
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
  const user = await getUserById(idUser);
  if (!user) {
    return res.status(404).json({
      message: "No existe ningun usuario con ese id",
    });
  }
  const userData = req.body;
  try {
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
  const user = await getUserById(idUser);
  if (!user) {
    return res.status(404).json({
      message: "No existe ningun usuario con ese id",
    });
  }
  try {
    await deleteUser(user.idUser);
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
