import { getIdToken } from "../../helpers/authHelper";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
} from "../services/service.service.js";
import { getServiceStateByName } from "../services/serviceState.service";
import { changeStateService } from "../services/stateService.service";

export async function serviceCreate(req, res) {
  try {
    const idUser = req.user.idUser;

    const  service = await createService(idUser, req.body);

    return res
      .status(201)
      .json({ message: "Se creó correctamente el servicio", service: service });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getServices(req, res) {
  try {
    const services = await getAllServices();

    if (!services[0]) {
      return res.status(204).json({ message: "No existe ningún servicio", services: services });
    }

    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getServicesByIdUser(req, res) {
  try {
    const idUser = await getIdToken(req.header("auth-token"));

    const services = await getServicesByIdUser(idUser);

    if (services[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningún servicio creado por este usuario" });
    }

    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getService(req, res) {
  const { idService } = req.params;

  try {
    const services = await getServiceById(idService);

    if (services[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningún servicio con ese id" });
    }

    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function serviceUpdate(req, res) {
  const { idService } = req.params;

  try {
    const services = await getServiceById(idService);

    if (services[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningún servicio con ese id" });
    }

    await updateService(idService, req.body);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente el servicio" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function serviceDelete(req, res) {
  const { idService } = req.params;

  try {
    const services = await getServiceById(idService);

    if (services[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningún servicio con ese id" });
    }

    const serviceState = await getServiceStateByName("INACTIVO");

    const idUser = await getIdToken(req.header("auth-token"));

    await changeStateService(idService, serviceState[0].idServiceState, idUser);

    return res
      .status(200)
      .json({ message: "Se ha dado de baja correctamente el servicio" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function changeState(req, res) {
  const { idService, userStateName } = req.params;

  try {
    const idUserAuthor = await getIdToken(req.header("auth-token"));

    const service = await getServiceById(idService);

    if (!service[0]) {
      return res.status(404).json({
        message: "No existe ningun servicio con ese id",
      });
    }

    const idUser = await getUserById(idUserAuthor);

    if (!idUser[0]) {
      return res.status(404).json({
        message: "No existe ningun servicio con ese id",
      });
    }

    const serviceState = await getServiceStateByName(userStateName);

    await changeStateService(idService, serviceState[0].idUserState, idUser);

    return res
      .status(200)
      .json({ message: "Se ha cambiado el estado del servicio" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
