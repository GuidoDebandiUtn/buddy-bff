import { Service } from "../../models/Service.js";
import { sequelize } from "../../database/database.js";
import { getServiceStateByName } from "./serviceState.service.js";
import { createStateService } from "./stateService.service.js";

export async function createService(idUser, data) {
  const {
    serviceTitle,
    serviceDescription,
    openTime,
    closeTime,
    addres,
    open24hs,
    idServiceType,
    idLocality,
  } = data;

  try {
    const newService = await Service.create(
      {
        serviceTitle,
        serviceDescription,
        openTime,
        closeTime,
        addres,
        idUser,
        open24hs,
        idServiceType,
        idLocality,
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        fields: [
          "serviceTitle",
          "serviceDescription",
          "openTime",
          "closeTime",
          "addres",
          "open24hs",
          "idUser",
          "idServiceType",
          "idLocality",
          "createdDate",
          "updatedDate",
        ],
      }
    );

    const serviceState = await getServiceStateByName("ACTIVO");

    await createStateService(
      newService.idService,
      serviceState[0].idServiceState
    );

    return newService;
  } catch (error) {
    throw error;
  }
}

export async function getAllServices() {
  try {
    const query = `
          SELECT services.serviceTitle, services.serviceDescription, services.addres, services.openTime, services.closeTime, services.open24hs
          FROM services
          INNER JOIN (
              SELECT idService, idServiceState, MAX(createdDate) AS ultimaFecha
              FROM stateServices 
              GROUP BY idService) AS ultimosEstados ON services.idService = ultimosEstados.idService
          INNER JOIN serviceStates ON ultimosEstados.idServiceState = serviceStates.idServiceState
          WHERE serviceStates.serviceStateName = 'ACTIVO'
      `;

    const services = await sequelize.query(query, {
      model: Service,
      mapToModel: true,
    });

    return services;
  } catch (error) {
    throw error;
  }
}

export async function getServicesByIdUser(idUser) {
  try {
    const query = `
        SELECT services.serviceTitle, services.serviceDescription, services.addres, services.openTime, services.closeTime, services.open24hs
        FROM services
        INNER JOIN (
            SELECT idService, idServiceState, MAX(createdDate) AS ultimaFecha
            FROM stateServices 
            GROUP BY idService) AS ultimosEstados ON services.idService = ultimosEstados.idService
        INNER JOIN serviceStates ON ultimosEstados.idServiceState = serviceStates.idServiceState
        WHERE serviceStates.serviceStateName = 'ACTIVO' and services.idUser = '${idUser}'
    `;

    const services = await sequelize.query(query, {
      model: Service,
      mapToModel: true,
    });

    return services;
  } catch (error) {
    throw error;
  }
}

export async function getServiceById(idService) {
  try {
    const query = `
          SELECT services.serviceTitle, services.serviceDescription, services.addres, services.openTime, services.closeTime, services.open24hs
          FROM services
          INNER JOIN (
              SELECT idService, idServiceState, MAX(createdDate) AS ultimaFecha
              FROM stateServices 
              GROUP BY idService) AS ultimosEstados ON services.idService = ultimosEstados.idService
          INNER JOIN serviceStates ON ultimosEstados.idServiceState = serviceStates.idServiceState
          WHERE serviceStates.serviceStateName = 'ACTIVO' and services.idService = '${idService}'
      `;

    const services = await sequelize.query(query, {
      model: Service,
      mapToModel: true,
    });

    return services;
  } catch (error) {
    throw error;
  }
}

export async function updateService(idService, data) {
  const {
    serviceTitle,
    serviceDescription,
    openTime,
    closeTime,
    addres,
    open24hs,
    idServiceType,
    idLocality,
  } = data;

  try {
    const updates = {};
    const updateOptions = { where: { idService } };

    if (serviceTitle) {
      updates.serviceTitle = serviceTitle;
    }

    if (serviceDescription) {
      updates.serviceDescription = serviceDescription;
    }

    if (openTime) {
      updates.openTime = openTime;
    }

    if (closeTime) {
      updates.closeTime = closeTime;
    }

    if (addres) {
      updates.addres = addres;
    }

    if (open24hs) {
      updates.open24hs = open24hs;
    }

    if (idServiceType) {
      updates.idServiceType = idServiceType;
    }

    if (idLocality) {
      updates.idLocality = idLocality;
    }

    updates.updatedDate = new Date();

    await Service.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}
