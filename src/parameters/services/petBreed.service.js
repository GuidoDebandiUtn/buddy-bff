import { PetBreed } from "../../models/PetBreed.js";
import { sequelize } from "../../database/database.js";

export async function createPetBreed(data) {
  const { petBreedName, idPetType } = data;

  try {
    const petBreed = await PetBreed.create(
      {
        petBreedName: petBreedName.toUpperCase(),
        createdDate: new Date(),
        updatedDate: new Date(),
        idPetType,
      },
      {
        fields: [
          "petBreedName",
          "active",
          "createdDate",
          "updatedDate",
          "idPetType",
        ],
      }
    );

    return petBreed;
  } catch (error) {
    throw error;
  }
}

export async function getAllPetBreeds() {
  try {
    const query = `
    SELECT idPetBreed, petBreedName
    FROM petbreeds
    WHERE active = true
    `;

    const petBreeds = await sequelize.query(query, {
      model: PetBreed,
      mapToModel: true,
    });

    return petBreeds;
  } catch (error) {
    throw error;
  }
}

export async function getPetBreedById(idPetBreed) {
  try {
    const query = `
    SELECT idPetBreed, petBreedName
    FROM petbreeds
    WHERE idPetBreed = '${idPetBreed}'
    `;

    const petBreed = await sequelize.query(query, {
      model: PetBreed,
      mapToModel: true,
    });

    return petBreed;
  } catch (error) {
    throw error;
  }
}

export async function getPetBreedByName(petBreedName) {
  try {
    const query = `
    SELECT idPetBreed, petBreedName
    FROM petbreeds
    WHERE petBreedName = '${petBreedName.toUpperCase()}'
    `;

    const petBreed = await sequelize.query(query, {
      model: PetBreed,
      mapToModel: true,
    });

    return petBreed;
  } catch (error) {
    throw error;
  }
}

export async function updatePetBreed(data, idPetBreed) {
  const { petBreedName } = data;

  try {
    await PetBreed.update(
      { petBreedName: petBreedName.toUpperCase(), updatedDate: new Date() },
      { where: { idPetBreed }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function deletePetBreed(idPetBreed) {
  try {
    await PetBreed.update(
      { active: false, updatedDate: new Date() },
      { where: { idPetBreed }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
