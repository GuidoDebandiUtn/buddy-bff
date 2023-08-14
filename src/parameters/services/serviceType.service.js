import { ServiceType } from "../../models/ServiceType.js";

export async function createServiceType(data) {
  const { serviceTypeName } = data;

  try {
    const serviceType = await ServiceType.create(
      {
        serviceTypeName: serviceTypeName.toUpperCase(),
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      { fields: ["serviceTypeName", "active", "createdDate", "updatedDate"] }
    );

    return serviceType;
  } catch (error) {
    throw error;
  }
}

export async function getAllServiceTypes() {
  try {
    const serviceTypes = await ServiceType.findAll({
      attributes: ["idServiceType","serviceTypeName"],
      where: { active: true },
    });

    return serviceTypes;
  } catch (error) {
    throw error;
  }
}

export async function getServiceTypeById(idServiceType) {
  try {
    const serviceType = await ServiceType.findOne({
      attributes: ["idServiceType", "serviceTypeName"],
      where: { idServiceType, active: true },
    });

    return serviceType;
  } catch (error) {
    throw error;
  }
}

export async function getServiceTypeByName(serviceTypeName) {
  try {
    const serviceType = await ServiceType.findOne({
      attributes: ["idServiceType", "serviceTypeName"],
      where: { serviceTypeName: serviceTypeName.toUpperCase(), active: true },
    });

    return serviceType;
  } catch (error) {
    throw error;
  }
}

export async function updateServiceType(data, idServiceType) {
  const { serviceTypeName } = data;

  try {
    await ServiceType.update(
      {
        serviceTypeName: serviceTypeName.toUpperCase(),
        updatedDate: new Date(),
      },
      { where: { idServiceType }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function deleteServiceType(idServiceType) {
  try {
    await ServiceType.update(
      {
        active: false,
        updatedDate: new Date(),
      },
      { where: { idServiceType }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
