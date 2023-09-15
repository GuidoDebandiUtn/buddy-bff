import { ServiceType } from "../../models/ServiceType.js";
import { sequelize } from "../../database/database.js";

export async function createServiceType(data) {
  const { serviceTypeName } = data;

  try {
    const serviceType = await ServiceType.create(
      {
        serviceTypeName: serviceTypeName.toUpperCase(),
      },
      { fields: ["serviceTypeName"] }
    );

    return serviceType;
  } catch (error) {
    throw error;
  }
}

export async function getAllServiceTypes() {
  try {
    const query = `
    SELECT idServiceType, serviceTypeName
    FROM servicetypes
    WHERE active = true
    `;

    const serviceTypes = await sequelize.query(query, {
      model: ServiceType,
      mapToModel: true,
    });

    return serviceTypes;
  } catch (error) {
    throw error;
  }
}

export async function getServiceTypeById(idServiceType) {
  try {
    const query = `
    SELECT idServiceType, serviceTypeName
    FROM servicetypes
    WHERE idServiceType = '${idServiceType}'
    `;

    const serviceType = await sequelize.query(query, {
      model: ServiceType,
      mapToModel: true,
    });

    return serviceType;
  } catch (error) {
    throw error;
  }
}

export async function getServiceTypeByName(serviceTypeName) {
  try {
    const query = `
    SELECT idServiceType, serviceTypeName
    FROM servicetypes
    WHERE serviceTypeName = '${serviceTypeName.toUpperCase()}'
    `;

    const serviceType = await sequelize.query(query, {
      model: ServiceType,
      mapToModel: true,
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
      },
      { where: { idServiceType }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function activeServiceType(idServiceType) {
  try {
    await ServiceType.update(
      {
        active: true,
      },
      { where: { idServiceType }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
