import jwt from "jsonwebtoken";
import { CreateUserDto } from "../dtos/userDto.js";
import { createUser, getUserByMail } from "../services/user.service.js";
import { findToken, insertToken } from "../services/token.service.js";

export async function userRegistration(req, res) {
  const userData = req.body;
  try {
    if (await getUserByMail(userData.mail)) {
      return res
        .status(400)
        .json({ message: "Este mail ya se necuentra en uso" });
    }
    const newUser = await createUser(userData);
    const newUserDto = new CreateUserDto(
      newUser.mail,
      newUser.userName,
      newUser.name,
      newUser.lastName,
      newUser.createdDate
    );
    res.status(201).json(newUserDto);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const user = await getUserByMail(req.body.mail);
    if (!user) {
      return res.status(404).json({
        message: "No existe un usuario con ese mail",
      });
    }
    if (!user.validated) {
      return res.status(400).json({
        message: "Aun no ha validado el usuario",
      });
    }
    const token = jwt.sign(
      { idUser: user.idUser, mail: user.mail },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.header("auth-token", token).json({
      data: { token },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function verifyToken(req, res, next) {
  const token = req.header("auth-token");
  try {
    if (!token)
      return res.status(401).json({
        error: "Acceso denegado",
      });
    if (await findToken(token)) {
      return res.status(401).json({
        error: "Token expirado",
      });
    }
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      error: "El token no es válido",
    });
  }
}

export async function logout(req, res) {
  const token = req.header("auth-token");
  try {
    await insertToken(token);
    res.status(200).json({ message: "Logout exitoso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
