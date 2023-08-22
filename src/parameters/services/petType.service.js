import { sequelize } from "../../database/database.js";
import { PetType } from "../../models/PetType.js";

export async function createPetType(data) {
  const { petTypeName, legsNumber } = data;
  try {
    const petType = await PetType.create(
      {
        petTypeName: petTypeName.toUpperCase(),
        legsNumber,
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        fields: [
          "petTypeName",
          "legsNumber",
          "active",
          "createdDate",
          "updatedDate",
        ],
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
    SELECT idPetType, petTypeName
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

export async function getPetTypeById(idPetType) {
  try {
    const query = `
    SELECT pettypes.idPetType, pettypes.petTypeName, petbreeds.petBreedName
    FROM pettypes
    LEFT JOIN petbreeds ON pettypes.idPetType = petbreeds.idPetType
    WHERE petTypes.idPetType = '${idPetType}'
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

export async function getPetTypeByName(petTypeName) {
  try {
    const query = `
    SELECT idPetType, petTypeName
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
  const { petTypeName } = data;

  try {
    await PetType.update(
      { petTypeName: petTypeName.toUpperCase(), updatedDate: new Date() },
      { where: { idPetType }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function deletePetType(idPetType) {
  try {
    await PetType.update(
      { active: false, updatedDate: new Date() },
      { where: { idPetType }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
