import {
  createEstablishment,
  getAllEstablishments,
  getEstablishmentById,
  getEstablishmentByMail,
  updateEstablishment,
} from "../services/establishment.service.js";
import { getIdToken } from "../../helpers/authHelper.js";
import { validateMail } from "../../helpers/mailHelper.js";
import { changeStateUser } from "../services/stateUser.service.js";
import { getUserStateByName } from "../services/userState.service.js";
import { destroyUser, getUserById } from "../services/user.service.js";
import { getRoleByName } from "../services/role.service.js";
import { changeUserRole } from "../services/userRole.service.js";

export async function establishmentCreate(req, res) {
  const data = req.body;

  try {
    const establishment = await getEstablishmentByMail(data.mail);

    if (establishment[0]) {
      return res
        .status(400)
        .json({ message: "Este mail ya se necuentra en uso" });
    }

    const newEstablishment = await createEstablishment(data);

    await validateMail(newEstablishment.mail, newEstablishment.idUser);

    return res
      .status(201)
      .json({ message: "Se creó correctamente el establecimiento" });
  } catch (error) {
    await destroyUser(data.mail);
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getEstablishments(req, res) {
  try {
    const establishments = await getAllEstablishments();

    if (!establishments[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun establecimiento" });
    }

    return res.status(200).json(establishments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getEstablishment(req, res) {
  const { idUser } = req.params;

  try {
    const establishment = await getEstablishmentById(idUser);

    if (!establishment[0]) {
      return res.status(404).json({
        message: "No se encuentra ningun establecimiento con ese id",
      });
    }

    return res.status(200).json(establishment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function establishmentUpdate(req, res) {
  const { idUser } = req.params;

  try {
    const establishment = await getEstablishmentById(idUser);

    if (!establishment[0]) {
      return res.status(404).json({
        message: "No existe ningun establecimiento con ese id",
      });
    }

    await updateEstablishment(idUser, req.body);

    res
      .status(200)
      .json({ message: "Se ha actualizado correctamente el establecimiento" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function establishmentDelete(req, res) {
  const { idUser } = req.params;

  try {
    const establishment = await getEstablishmentById(idUser);

    if (!establishment[0]) {
      return res.status(404).json({
        message: "No existe ningun establecimiento con ese id",
      });
    }

    const userState = await getUserStateByName("INACTIVO");

    const idUserAuthor = await getIdToken(req.header("auth-token"));

    await changeStateUser(idUser, userState[0].idUserState, idUserAuthor);

    res.status(200).json({ message: "El establecimiento se ha dado de baja" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function changeState(req, res) {
  const { idUser, userStateName } = req.params;

  try {
    const idUserAuthor = await getIdToken(req.header("auth-token"));

    const establishment = await getEstablishmentById(idUser);

    if (!establishment[0]) {
      return res.status(404).json({
        message: "No existe ningun establecimiento con ese id",
      });
    }

    const exist = await getUserById(idUserAuthor);

    if (!exist) {
      return res.status(404).json({
        message: "No existe ningun establecimiento con ese id",
      });
    }

    const userState = await getUserStateByName(userStateName);

    await changeStateUser(idUser, userState[0].idUserState, idUserAuthor);

    res
      .status(200)
      .json({ message: "Se ha cambiado el estado del establecimiento" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function changeRole(req, res) {
  const { idUser, roleName } = req.params;

  try {
    const idUserAuthor = await getIdToken(req.header("auth-token"));

    const establishment = await getUserById(idUser);

    if (!establishment[0]) {
      return res.status(404).json({
        message: "No existe ningun establecimiento con ese id",
      });
    }

    const exist = await getUserById(idUserAuthor);

    if (!exist) {
      return res.status(404).json({
        message: "No existe ningun establecimiento con ese id",
      });
    }

    const role = await getRoleByName(roleName);

    await changeUserRole(idUser, role[0].idRole, idUserAuthor);

    return res
      .status(200)
      .json({ message: "Se ha cambiado el rol del establecimiento" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
