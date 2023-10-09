import { Service } from "../../models/Service.js";
import { ServiceType } from "../../models/ServiceType.js";
import { ServicePet } from "../../models/ServicePet.js";
import { sequelize } from "../../database/database.js";
import { getServiceStateByName } from "./serviceState.service.js";
import { createStateService } from "./stateService.service.js";
import { ServiceState } from "../../models/ServiceState.js";
import { changeStateService } from "../services/stateService.service.js";
import { getPetTypeByIdIn } from "../../parameters/services/petType.service.js";
import { Rating } from "../../models/Rating.js";

export async function createService(idUser, data) {
  const {
    serviceTitle,
    serviceDescription,
    openTime,
    closeTime,
    address,
    open24hs,
    idServiceType,
    idLocality,
    emailService,
    images,
  } = data;

  let service = await getServiceByUserIdAndServiceType(idUser, idServiceType);

  if (service[0]) {
    throw {
      message: "Ya se ha registrado un servicio de este tipo para el Usuario",
      code: 400,
    };
  }

  try {
    const newService = await Service.create(
      {
        serviceTitle,
        serviceDescription,
        openTime,
        closeTime,
        address,
        idUser,
        open24hs,
        idServiceType,
        idLocality,
        emailService,
        images,
      },
      {
        fields: [
          "serviceTitle",
          "serviceDescription",
          "openTime",
          "closeTime",
          "address",
          "open24hs",
          "idUser",
          "idServiceType",
          "idLocality",
          "emailService",
          "images",
        ],
      }
    );

    const serviceState = await getServiceStateByName("ACTIVO");

    console.log(
      'Se a obtenido el siguiente resultado de la busqueda getServiceStateByName("ACTIVO"): ',
      serviceState[0].idServiceState
    );

    await createStateService(
      newService.idService,
      serviceState[0].idServiceState
    );

    const petTypes = await getPetTypeByIdIn(data.petTypes);

    console.log(
      "Se a obtenido el siguiente resultado de la busqueda getPetTypeByIdIn(data.petTypes): ",
      petTypes
    );

    await createServicePetTypes(newService.idService, petTypes);

    return newService;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getServiceByUserIdAndServiceType(idUser, idServiceType) {
  try {
    const query = `
          SELECT services.images,services.serviceTitle, services.serviceDescription, services.address, services.openTime, services.closeTime, services.open24hs,services.avgRating
          FROM services
          INNER JOIN (
              SELECT idService, idServiceState, MAX(createdAt) AS ultimaFecha , active
              FROM stateServices 
              GROUP BY idService) AS ultimosEstados ON services.idService = ultimosEstados.idService
          INNER JOIN serviceStates ON ultimosEstados.idServiceState = serviceStates.idServiceState
          WHERE serviceStates.serviceStateName = 'ACTIVO' AND ultimosEstados.active = 1 and services.idUser = '${idUser}' AND services.idServiceType = '${idServiceType}'
      `;

    const services = await sequelize.query(query, {
      model: Service,
      mapToModel: true,
    });

    for (let service of services) {
      if (service.images[0]) {
        console.log("imagen antes del parse: ", service.image);
        service.images = JSON.parse(service.images);
        console.log("imagen desíes del parse: ", service.image);
      }
    }

    return services;
  } catch (error) {
    throw error;
  }
}

export async function getServicesByIdUser(idUser) {
  try {
    const query = `
      SELECT
        services.images,services.serviceTitle, services.serviceDescription, services.address, services.openTime, services.closeTime, services.open24hs, services.idService,services.avgRating,services.emailService, services.idUser,
        serviceStates.serviceStateName,serviceStates.idServiceState,
        GROUP_CONCAT(petTypes.idPetType) AS idPetTypes, GROUP_CONCAT(petTypes.petTypeName) AS petTypesName,
        servicetypes.idServiceType,servicetypes.serviceTypeName 
      FROM services
      INNER JOIN (
        SELECT idService,idServiceState, MAX(createdAt) AS ultimaFecha , active  FROM stateServices
        GROUP BY  idService
      ) AS ultimosEstados ON services.idService = ultimosEstados.idService
      INNER JOIN serviceStates ON  ultimosEstados.idServiceState = serviceStates.idServiceState
      INNER JOIN servicepets   ON services.idService = ServicePets.idService
      INNER JOIN PetTypes ON ServicePets.idPetType = PetTypes.idPetType
      INNER JOIN servicetypes ON servicetypes.idServiceType = services.idServiceType
      WHERE serviceStates.serviceStateName = 'ACTIVO' AND ultimosEstados.active = 1 and services.idUser = '${idUser}'
      GROUP BY services.serviceTitle,services.serviceDescription,services.address,services.openTime,services.closeTime, services.open24hs
    `;

    const services = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    const servicesWithPetTypes = services.map((service) => {
      const idPetTypes = service.idPetTypes.split(",");
      const petTypesName = service.petTypesName.split(",");

      const petTypes = idPetTypes.map((id, index) => ({
        idPetType: id,
        petTypeName: petTypesName[index],
      }));

      return {
        ...service,
        petTypes,
      };
    });
    for (let service of servicesWithPetTypes) {
      if (service.images) {
        console.log("imagen antes del parse: ", service.image);
        service.images = JSON.parse(service.images);
        console.log("imagen desíes del parse: ", service.image);
      }
    }

    return servicesWithPetTypes;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllServices() {
  try {
    const query = `
      SELECT
        services.images,services.serviceTitle, services.serviceDescription, services.address, services.openTime, services.closeTime, services.open24hs, services.idService,services.avgRating,services.emailService, services.idUser,
        serviceStates.serviceStateName,serviceStates.idServiceState,
        GROUP_CONCAT(petTypes.idPetType) AS idPetTypes, GROUP_CONCAT(petTypes.petTypeName) AS petTypesName,
        servicetypes.idServiceType,servicetypes.serviceTypeName 
      FROM services
      INNER JOIN (
        SELECT idService , idServiceState , active
        FROM stateServices
        WHERE active = true
      ) AS ultimosEstados ON services.idService = ultimosEstados.idService
      INNER JOIN serviceStates ON  ultimosEstados.idServiceState = serviceStates.idServiceState
      INNER JOIN servicepets   ON services.idService = ServicePets.idService
      INNER JOIN PetTypes ON ServicePets.idPetType = PetTypes.idPetType
      INNER JOIN servicetypes ON servicetypes.idServiceType = services.idServiceType
      WHERE  serviceStates.serviceStateName = 'ACTIVO'  AND ultimosEstados.active = 1
      GROUP BY services.serviceTitle,services.serviceDescription,services.address,services.openTime,services.closeTime, services.open24hs
    `;

    const services = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    const servicesWithPetTypes = services.map((service) => {
      const idPetTypes = service.idPetTypes.split(",");
      const petTypesName = service.petTypesName.split(",");

      const petTypes = idPetTypes.map((id, index) => ({
        idPetType: id,
        petTypeName: petTypesName[index],
      }));

      return {
        ...service,
        petTypes,
      };
    });
    for (let service of servicesWithPetTypes) {
      console.log("entidad del for: ", service);
      if (service.images) {
        console.log("imagen antes del parse: ", service.image);
        service.images = JSON.parse(service.images);
        console.log("imagen desíes del parse: ", service.image);
      }
    }

    return servicesWithPetTypes;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateService(service, data) {
  try {
    const updateOptions = { where: { idService: service.idService } };

    const updates = {
      ...(data.serviceTitle && { serviceTitle: data.serviceTitle }),
      ...(data.images && { images: data.images }),
      ...(data.emailService && { emailService: data.emailService }),
      ...(data.serviceDescription && {
        serviceDescription: data.serviceDescription,
      }),
      ...(data.openTime && { openTime: data.openTime }),
      ...(data.closeTime && { closeTime: data.closeTime }),
      ...(data.address && { address: data.address }),
      ...(data.open24hs && { open24hs: data.open24hs }),
      ...(data.idLocality && { idLocality: data.idLocality }),
    };

    if (data.petTypes) {
      await ServicePet.destroy({ where: { idService: service.idService } });
      await createServicePetTypes(service.idService, data.petTypes);
    }

    if (data.idServiceType) {
      let servicio = await getServiceByUserIdAndServiceType(
        service.idUser,
        data.idServiceType
      );

      if (servicio[0]) {
        throw {
          message:
            "Ya se ha registrado un servicio de este tipo para el Usuario",
          code: 400,
        };
      }
    }

    await Service.update(updates, updateOptions);

    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getServiceById(idService) {
  try {
    const query = `      
      SELECT
        services.images,services.serviceTitle, services.serviceDescription, services.address, services.openTime, services.closeTime, services.open24hs, services.idService,services.avgRating, services.emailService, services.idUser,
        serviceStates.serviceStateName,serviceStates.idServiceState,
        GROUP_CONCAT(petTypes.idPetType) AS idPetTypes, GROUP_CONCAT(petTypes.petTypeName) AS petTypesName,
        servicetypes.idServiceType,servicetypes.serviceTypeName 
      FROM services
      INNER JOIN (
          SELECT idService,idServiceState, MAX(createdAt) AS ultimaFecha , active  FROM stateServices
          GROUP BY  idService
      ) AS ultimosEstados ON services.idService = ultimosEstados.idService
      INNER JOIN serviceStates ON  ultimosEstados.idServiceState = serviceStates.idServiceState
      INNER JOIN servicepets   ON services.idService = ServicePets.idService
      INNER JOIN PetTypes ON ServicePets.idPetType = PetTypes.idPetType
      INNER JOIN servicetypes ON servicetypes.idServiceType = services.idServiceType
      WHERE  serviceStates.serviceStateName = 'ACTIVO' AND ultimosEstados.active = 1 and services.idService = '${idService}'
      GROUP BY services.serviceTitle,services.serviceDescription,services.address,services.openTime,services.closeTime, services.open24hs
    `;

    const services = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    const servicesWithPetTypes = services.map((service) => {
      const idPetTypes = service.idPetTypes.split(",");
      const petTypesName = service.petTypesName.split(",");

      const petTypes = idPetTypes.map((id, index) => ({
        idPetType: id,
        petTypeName: petTypesName[index],
      }));

      return {
        ...service,
        petTypes,
      };
    });

    for (let service of servicesWithPetTypes) {
      if (service.images) {
        console.log("imagen antes del parse: ", service.image);
        service.images = JSON.parse(service.images);
        console.log("imagen desíes del parse: ", service.image);
      }
    }

    return servicesWithPetTypes;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteService(service, idAuthor) {
  try {
    const serviceState = (await getStateForService(service.idService))[0];
    const serviceStateInactive = (await getServiceStateByName("INACTIVO"))[0];

    console.log("serviceState: ", serviceState);
    console.log("serviceStateInactive: ", serviceStateInactive);
    if (serviceState.idServiceState == serviceStateInactive.idServiceState) {
      throw { message: "El servicio ya se encuentra eliminado!", code: 400 };
    }

    await changeStateService(
      service.idService,
      serviceStateInactive.idServiceState,
      idAuthor
    );
    await deleteServicePetTypes(service.idService, service.petTypes);
    await Service.update(
      { active: false },
      { where: { idService: service.idService }, returning: true }
    );

    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getStateForService(idService) {
  try {
    const query = `
      select state.*  from servicestates as state 
      join stateservices change_sate on change_sate.idServiceState = state.idServiceState
      join services u on u.idService = change_sate.idService
      where u.idService= '${idService}' and change_sate.active = 1 
      order by change_sate.createdAt desc 
      limit 1;`;

    const state = await sequelize.query(query, {
      model: ServiceState,
      mapToModel: true,
    });

    return state;
  } catch (error) {
    throw error;
  }
}

export async function createServicePetTypes(idService, petTypes) {
  try {
    for (const petType of petTypes) {
      console.log("idService: %s, idPetType: ", idService, petType);
      await ServicePet.create({
        idService: idService,
        idPetType: petType.idPetType,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteServicePetTypes(idService, petTypes) {
  try {
    for (const petType of petTypes) {
      await ServicePet.update(
        { active: false },
        { where: { idService }, returning: true }
      );
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function calculateAverageRating(service) {
  try {
    const result = await Rating.findOne({
      attributes: [
        [sequelize.fn("AVG", sequelize.col("numberRating")), "avgRating"],
      ],
      where: { idService: service.idService },
    });

    const avgRating = result.get("avgRating");

    await Service.update(
      { avgRating: avgRating },
      {
        where: { idService: service.idService },
      }
    );

    console.log(
      "Valoración promedio actualizada para el servicio:",
      service.idService
    );
  } catch (err) {
    console.error(
      "Error al calcular la valoración promedio del servicio: %s, error:",
      service.idService,
      err
    );
    throw err;
  }
}

export async function retriveServiceTypesDB() {
  try {
    const types = await ServiceType.findAll({ where: { active: true } });

    return types;
  } catch (err) {
    console.error("Error al obtener los tipos de servicio: ", err);
    throw err;
  }
}

export async function getServicesEvery() {
  try {
    const query = `
    SELECT
      services.serviceTitle, services.emailService, services.idService, serviceStates.serviceStateName,servicetypes.serviceTypeName, services.images 
    FROM services
    INNER JOIN (
      SELECT idService , idServiceState
      FROM stateServices
      WHERE active = true
    ) AS ultimosEstados ON services.idService = ultimosEstados.idService
    INNER JOIN serviceStates ON  ultimosEstados.idServiceState = serviceStates.idServiceState
    INNER JOIN servicetypes ON servicetypes.idServiceType = services.idServiceType
    GROUP BY services.serviceTitle,services.serviceDescription
  `;

    const services = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    return services;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
