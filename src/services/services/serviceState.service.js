import { ServiceState } from "../../models/ServiceState.js";
import { sequelize } from "../../database/database.js";

export async function createServiceState(data) {
  const { serviceStateName } = data;
  try {
    const serviceState = await ServiceState.create(
      {
        serviceStateName: serviceStateName.toUpperCase(),
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        fields: ["serviceStateName", "active", "createdDate", "updatedDate"],
      }
    );

    return serviceState;
  } catch (error) {
    throw error;
  }
}

export async function getAllServiceState() {
  try {
    const query = `
        SELECT idServiceState, serviceStateName
        FROM serviceStates
        WHERE active = true`;

    const serviceStates = await sequelize.query(query, {
      model: ServiceState,
      mapToModel: true,
    });

    return serviceStates;
  } catch (error) {
    throw error;
  }
}

export async function getServiceStateById(idServiceState) {
  try {
    const query = `
        SELECT idServiceState, serviceStateName
        FROM serviceStates
        WHERE idServiceState = "${idServiceState}"`;

    const serviceState = await sequelize.query(query, {
      model: ServiceState,
      mapToModel: true,
    });

    return serviceState;
  } catch (error) {
    throw error;
  }
}

export async function getServiceStateByName(serviceStateName) {
  try {
    const query = `
        SELECT idServiceState, serviceStateName
        FROM serviceStates
        WHERE serviceStateName = "${serviceStateName.toUpperCase()}"`;

    const serviceState = await sequelize.query(query, {
      model: ServiceState,
      mapToModel: true,
    });

    return serviceState;
  } catch (error) {
    throw error;
  }
}

export async function updateServiceState(data, idServiceState) {
  const { serviceStateName } = data;

  try {
    await ServiceState.update(
      {
        serviceStateName: serviceStateName.toUpperCase(),
        updatedDate: new Date(),
      },
      { where: { idServiceState: idServiceState }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function deleteServiceState(idServiceState) {
  try {
    await ServiceState.update(
      { active: false, updatedDate: new Date() },
      { where: { idServiceState: idServiceState }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function activeServiceState(idServiceState) {
  try {
    await ServiceState.update(
      { active: true, updatedDate: new Date() },
      { where: { idServiceState: idServiceState }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
