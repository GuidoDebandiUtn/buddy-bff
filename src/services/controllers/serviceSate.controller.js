import { getServiceById } from "../services/service.service.js";
import { getServiceStateByName } from "../services/serviceState.service.js";
import { changeStateService } from "../services/stateService.service.js";

export async function changeServiceState(req, res) {
  const { idService, serviceStateName } = req.params;
  const idUserAuthor = req.user.idUser;
  const userPermissions = req.user.permissions[0].permisos.split(' - ');

  const requiredPermissions = ["WRITE_SERVICIOS",];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));


  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permisos necesarios" });
  }


  try {
    const service = await getServiceById(idService);

    if (!service[0]) {
      return res.status(404).json({
        message: "Error en el idServicio enviado",
      });
    }

    const serviceState = await getServiceStateByName(serviceStateName);

    await changeStateService(
      idService,
      serviceState[0].idServiceState,
      idUserAuthor
    );

    return res
      .status(200)
      .json({ message: "Se ha cambiado el estado del servicio" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
