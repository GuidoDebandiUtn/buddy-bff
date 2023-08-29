import {
  activeServiceType,
  createServiceType,
  deleteServiceType,
  getAllServiceTypes,
  getServiceTypeById,
  getServiceTypeByName,
  updateServiceType,
} from "../services/serviceType.service.js";

export async function serviceTypeCreate(req, res) {
  try {
    const duplicate = await getServiceTypeByName(req.body.serviceTypeName);

    if (duplicate[0]) {
      return res
        .status(400)
        .json({ message: "Ya existe un tipo de servicio con este nombre" });
    }

    const serviceType = await createServiceType(req.body);

    return res.status(201).json({ serviceType });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getServiceTypes(req, res) {
  try {
    const serviceTypes = await getAllServiceTypes();

    if (!serviceTypes[0]) {
      return res.status(404).json({ message: "No existen tipos de servicio" });
    }

    return res.status(200).json({ serviceTypes });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getServiceType(req, res) {
  const { idServiceType } = req.params;

  try {
    const serviceType = await getServiceTypeById(idServiceType);

    if (!serviceType[0]) {
      return res
        .status(404)
        .json({ message: "No existe un tipo de servicio con este id" });
    }

    return res.status(200).json({ serviceType });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function serviceTypeUpdate(req, res) {
  const { idServiceType } = req.params;

  try {
    const serviceType = await getServiceTypeById(idServiceType);

    if (!serviceType[0]) {
      return res
        .status(404)
        .json({ message: "No existe un tipo de servicio con este id" });
    }

    const duplicate = await getServiceTypeByName(req.body.serviceTypeName);

    if (duplicate[0]) {
      return res
        .status(400)
        .json({ message: "Ya existe un tipo de servicio con este nombre" });
    }

    await updateServiceType(req.body, idServiceType);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente el tipo de servicio" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function serviceTypeDelete(req, res) {
  const { idServiceType } = req.params;

  try {
    const serviceType = await getServiceTypeById(idServiceType);

    if (!serviceType[0]) {
      return res
        .status(404)
        .json({ message: "No existe un tipo de servicio con este id" });
    }

    await deleteServiceType(idServiceType);

    return res.status(200).json({
      message: "Se ha dade de baja correctamente el tipo de servicio",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function serviceTypeActive(req, res) {
  const { idServiceType } = req.params;

  try {
    const serviceType = await getServiceTypeById(idServiceType);

    if (!serviceType[0]) {
      return res
        .status(404)
        .json({ message: "No existe un tipo de servicio con este id" });
    }

    await activeServiceType(idServiceType);

    return res.status(200).json({
      message: "Se ha dade de alta correctamente el tipo de servicio",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
