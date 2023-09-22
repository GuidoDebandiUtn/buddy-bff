import jwt from "jsonwebtoken";
import {
  getUserById,
  getUserByMail,
  updateUser,
  userValidate,
} from "../services/user.service.js";
import { findToken, insertToken } from "../services/token.service.js";
import { resetPasswordMail } from "../../helpers/mailHelper.js";
import bcrypt from "bcryptjs";

export async function login(req, res) {
  const { password } = req.body;

  try {
    const user = await getUserByMail(req.body.mail);

    if (!user[0]) {
      return res
        .status(404)
        .json({ message: "No existe un usuario con ese mail" });
    }

    if (!user[0].validated) {
      return res.status(400).json({ message: "Aun no ha validado el usuario" });
    }

    let token;

    const passwordMatch = await bcrypt.compare(password, user[0].password)

    if (passwordMatch) {
      token = jwt.sign(
        { idUser: user[0].idUser, mail: user[0].mail },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "30d",
        }
      );
    } else {
      return res.status(400).json({
        message: "Contraseña incorrecta",
      });
    }

    return res.status(200).header("auth-token", token).json({
      data: { token },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function verifyToken(req, res, next) {
  const token = req.header("auth-token");

  try {
    if (!token) {
      console.log("error en la obtencion del token en el header");
      return res.status(400).json({
        error: "Aún no ha iniciado sesión",
      });
    }

    if (await findToken(token)) {
      console.log("se ha encontrado el token en la lista de invalidados");
      return res.status(401).json({
        error: "Token expirado",
      });
    }

    //const permissions = await ;

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = verified;
    req.userPermissions= permissions

    next();
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "El token no es válido",
    });
  }
}

export async function logout(req, res) {
  const token = req.header("auth-token");

  try {
    await insertToken(token);

    return res.status(200).json({message: "Se ha revocado el token del usuario"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function validateUser(req, res) {
  const { idUser } = req.params;

  try {
    const checkUser = await getUserById(idUser);

    if (!checkUser[0]) {
      return res.status(404).render("validateUser/noFound");
    }

    await userValidate(idUser);

    return res.status(200).render("validateUser/success");
  } catch (error) {
    return res.status(500).render("validateUser/error");
  }
}

export async function resetPassword(req, res) {
  const { mail } = req.body;

  try {
    const user = await getUserByMail(mail);

    if (!user[0]) {
      return res.status(404).json({
        message: "No existe ningun usuario con ese mail",
      });
    }

    await resetPasswordMail(user[0].mail, user[0].idUser);

    res.status(200).json({ message: "Se ha enviado el mail" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function changePassword(req, res) {
  const { idUser } = req.params;
  try {
    const user = await getUserById(idUser);

    if (!user[0]) {
      return res.status(404).render("resetPassword/noFound");
    }

    await updateUser(idUser, req.body);

    return res.status(200).json({ message: "Se ha actualizado la contraseña" });
  } catch (error) {
    return res
      .status(500)
      .json({
        message:
          "Ha ocurrido un problema. No hemos podido verificar tu cuenta. Intenta nuevamente más tarde.",
          error
      });
  }
}

export async function changePasswordPage(req, res) {
  const { idUser } = req.params;
  try {
    const user = await getUserById(idUser);

    if (!user[0]) {
      return res.status(404).render("resetPassword/noFound");
    }

    return res.status(200).render("resetPassword/success", { idUser });
  } catch (error) {
    return res.status(500).render("resetPassword/error");
  }
}
