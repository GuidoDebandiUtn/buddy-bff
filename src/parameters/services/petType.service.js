import { sequelize } from "../../database/database.js";
import { PetType } from "../../models/PetType.js";

export async function createPetType(data) {
  const { petTypeName, legsNumber , diet, enviroment, coat, weather } = data;
  try {
    const petType = await PetType.create(
      {
        petTypeName: petTypeName.toUpperCase(),
        legsNumber, diet, enviroment, coat, weather
      },
      {
        fields: ["petTypeName", "legsNumber", "diet", "enviroment", "coat", "weather"],
      }
    );

    return petType;
  } catch (error) {
    throw error;
  }
}

export async function getAllPetTypes() {
  try {
    const query = `
    SELECT idPetType, petTypeName, diet, enviroment, coat, weather
    FROM pettypes
    WHERE active = true
    `;

    const petTypes = await sequelize.query(query, {
      model: PetType,
      mapToModel: true,
    });

    return petTypes;
  } catch (error) {
    throw error;
  }
}

export async function getEveryPetTypes() {
  try {
    const query = `
    SELECT idPetType, petTypeName
    FROM pettypes
    `;

    const petTypes = await sequelize.query(query, {
      model: PetType,
      mapToModel: true,
    });

    return petTypes;
  } catch (error) {
    throw error;
  }
}

export async function getPetTypeById(idPetType) {
  try {
    const query = `
    SELECT pettypes.idPetType, pettypes.petTypeName, pettypes.diet, pettypes.enviroment, pettypes.coat, pettypes.weather, GROUP_CONCAT(petbreeds.petBreedName) AS razas
    FROM pettypes
    LEFT JOIN petbreeds ON pettypes.idPetType = petbreeds.idPetType
    WHERE petTypes.idPetType = '${idPetType}'
    GROUP BY pettypes.idPetType, pettypes.petTypeName
    `;

    const petType = await sequelize.query(query, {
      model: PetType,
      mapToModel: true,
    });

    return petType;
  } catch (error) {
    throw error;
  }
}

export async function getPetTypeByIdIn(petTypes) {
  try {
    const petTypeIds = petTypes.map(petType => `'${petType.idPetType}'`).join(',');

    const query = `
    SELECT pettypes.idPetType, pettypes.petTypeName, pettypes.diet, pettypes.enviroment, pettypes.coat, pettypes.weather, GROUP_CONCAT(petbreeds.petBreedName) AS razas
    FROM pettypes
    LEFT JOIN petbreeds ON pettypes.idPetType = petbreeds.idPetType
    WHERE pettypes.idPetType IN (${petTypeIds})
    GROUP BY pettypes.idPetType, pettypes.petTypeName
    `;

    const petTypesReturn = await sequelize.query(query, {
      model: PetType,
      mapToModel: true,
    });

    return petTypesReturn;
  } catch (error) {
    throw error;
  }
}

export async function getPetTypeByName(petTypeName) {
  try {
    const query = `
    SELECT idPetType, petTypeName, diet, enviroment, coat, weather
    FROM pettypes
    WHERE petTypeName = '${petTypeName.toUpperCase()}'
    `;

    const petType = await sequelize.query(query, {
      model: PetType,
      mapToModel: true,
    });

    return petType;
  } catch (error) {
    throw error;
  }
}

export async function updatePetType(data, idPetType) {
  const { petTypeName, legsNumber, diet, enviroment, coat, weather } = data;

  try {
    const updates = {};
    const updateOptions = { where: { idPetType } };

    if (petTypeName) {
      updates.petTypeName = petTypeName.toUpperCase();
    }

    if (legsNumber) {
      updates.legsNumber = legsNumber;
    }

    if (diet) {
      updates.diet = diet;
    }

    if (enviroment) {
      updates.enviroment = enviroment;
    }

    if (coat) {
      updates.coat = coat;
    }

    if (weather) {
      updates.weather = weather;
    }

    await PetType.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}

export async function deletePetType(idPetType) {
  try {
    await PetType.update(
      { active: false },
      { where: { idPetType }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function activePetType(idPetType) {
  try {
    await PetType.update(
      { active: true },
      { where: { idPetType }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
