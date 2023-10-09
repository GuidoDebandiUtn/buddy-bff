
import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  getServicesByIdUser,
  getServicesEvery,
  retriveServiceTypesDB,
  updateService,
} from "../services/service.service.js";


export async function serviceCreate(req, res) {
  const idUser = req.user.idUser;

  const { idServiceType, petTypes } = req.body;

  const errorMessage =
    !idServiceType && !petTypes? "Error en el tipo del Servicio y en los tipos de mascotas enviados"
      : !idServiceType? "Error en el tipo del Servicio enviado"
      : !petTypes? "Error en los tipos de mascotas del servicio": null;

  if (errorMessage) {
    return res
      .status(400)
      .json({ message:errorMessage, code: 400 });
  }

  const userPermissions = req.user.permissions[0].permisos.split(' - ');
  
  const requiredPermissions = ['CREATE_SERVICIO_REFUGIO', 'CREATE_SERVICIO_PETSHOP','CREATE_SERVICIO_VETERINARIA'];
  const hasPermissions = requiredPermissions.some(permission => userPermissions.includes(permission));

  if (!hasPermissions) {
    return res.status(403).json({ message: "No se cuenta con los permisos necesarios para realizar la creacion" });
  }

  try {
    const service = await createService(idUser, req.body);

    return res
      .status(201)
      .json({ message: "Se creó correctamente el servicio", service: service });
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getServicesByUser(req, res) {
  const idUser = req.user.idUser;

  try {
    const services = await getServicesByIdUser(idUser);

    console.debug(
      "Se han obtenido los siguientes servicios para el user %s, ",
      idUser,
      services
    );

    if (!services[0]) {
      return res
        .status(204)
        .json({ message: "No existe ningún servicio creado por este usuario" });
    }

    return res.status(200).json(services);
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
      return res.status(204).json({ message: "No existe ningún servicio" });
    }

    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getEveryServices(req, res) {
  try {
    const services = await getServicesEvery();

    if (!services[0]) {
      return res.status(204).json({ message: "No existe ningún servicio" });
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

    if (!services[0]) {
      return res
        .status(204)
        .json({ message: "Error en la obtencion del servicio a modificar" });
    }

    await updateService(services[0], req.body);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente el servicio" });
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function serviceDelete(req, res) {
  const idAuthor = req.user.idUser;
  const { idService } = req.params;

  try {
    const services = await getServiceById(idService);

    if (!services[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningún servicio con ese id" });
    }

    await deleteService(services[0], idAuthor);

    return res
      .status(200)
      .json({ message: "Se ha dado de baja correctamente el servicio" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getServiceTypes(req, res) {
  const userPermissions = req.user.permissions[0].permisos.split(' - ');
  
  const requiredPermissions = ['CREATE_SERVICIO_REFUGIO', 'CREATE_SERVICIO_PETSHOP','CREATE_SERVICIO_VETERINARIA'];
  const hasPermissions = requiredPermissions.some(permission => userPermissions.includes(permission));

  if (!hasPermissions) {
    return res.status(403).json({ message: "No se cuenta con los permisos necesarios" });
  }

  try {
    const types = await retriveServiceTypesDB();

    const filteredTypes = types.filter(type => {
      const formattedType = type.toUpperCase().replace(' ', '');
      return userPermissions.includes(`CREATE_SERVICIO_${formattedType}`);
    });

    if (!types[0]) {
      return res.status(204).json({ message: "No existe ningún tipo" });
    }

    return res.status(200).json(types);
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

    if (!services[0]) {
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
