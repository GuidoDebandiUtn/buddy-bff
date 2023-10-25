import jwt from "jsonwebtoken";
import {
  getPermissionsForUser,
  getUserById,
  getUserByMail,
  updateUser,
  userValidate,
} from "../services/user.service.js";
import { resetPasswordMail } from "../../helpers/mailHelper.js";
import bcrypt from "bcryptjs";
import log  from "../../helpers/loggerHelper.js";

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

    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (passwordMatch) {
      const permissions = await getPermissionsForUser(user[0].idUser);

      token = jwt.sign(
        { idUser: user[0].idUser, permissions },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "7d",
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
      log('error',`error en la obtencion del token en el header`);
      return res.status(401).json({
        error: "Aún no ha iniciado sesión",
      });
    }

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!verified) {
      return res.status(400).json({
        error: "Token no es valido",
      });
    }

    const permissions = await getPermissionsForUser(verified.idUser);

    if (!permissions) {
      return res.status(400).json({
        error: "Error en la obtencion de los permisos del usuario",
      });
    }

    req.user = verified;
    req.userPermissions = permissions;
    log('debug',`usuario obtenido del token : ${verified}`);

    next();
  } catch (error) {
    log('error',`Error en la verificacion del token : ${error}`);
    return res.status(500).json({
      error: "El token no es válido",
    });
  }
}

export async function expirationToken(req, res) {
  const token = req.header("auth-token");

  try {
    const tokenDecodificado = jwt.decode(token);

    const fechaExpiracion = tokenDecodificado.exp * 1000; // La fecha de expiración en segundos
    const fechaActual = Date.now();

    if (fechaActual > fechaExpiracion) {
      return res.status(400).json({ error: "El token ha expirado" });
    } else {
      return res.status(200).json({ message: "El token es válido" });
    }
  } catch (error) {
    return res.status(500).json({
      error: "El token no es válido",
    });
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
    return res.status(500).json({
      message:
        "Ha ocurrido un problema. No hemos podido verificar tu cuenta. Intenta nuevamente más tarde.",
      error,
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
