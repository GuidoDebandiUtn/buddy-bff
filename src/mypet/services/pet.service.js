import { Pet } from "../../models/Pet.js";
import { sequelize } from "../../database/database.js";

export async function createPet(data, idUser) {
  const { petName, birthDate, idPetType, idPetBreed } = data;

  try {
    const newPet = await Pet.create(
      {
        petName,
        birthDate,
        active: true,
        createdDate: new Date(),
        updatedDate: new Date(),
        idUser,
        idPetType,
        idPetBreed,
      },
      {
        fields: [
          "petName",
          "birthDate",
          "active",
          "createdDate",
          "updatedDate",
          "idUser",
          "idPetType",
          "idPetBreed",
        ],
      }
    );

    return newPet;
  } catch (error) {
    throw error;
  }
}

export async function getAllPets(idUser) {
  try {
    const query = `
        SELECT idPet, petName, birthDate
        FROM pets
        WHERE idUser = "${idUser}" and active = true`;

    const pets = await sequelize.query(query, {
      model: Pet,
      mapToModel: true,
    });

    return pets;
  } catch (error) {
    throw error;
  }
}

export async function getPetById(idPet) {
  try {
    const query = `
            SELECT idPet, petName, birthDate
            FROM pets
            WHERE idPet = "${idPet}"`;

    const pet = await sequelize.query(query, {
      model: Pet,
      mapToModel: true,
    });

    return pet;
  } catch (error) {
    throw error;
  }
}

export async function updatePet(idPet, data) {
  const { petName, birthDate, image,idPetBreed,idPetType,idPetColor } = data;
  try {
    const updates = {}; 
    const updateOptions = { where: { idPet } };

    if (petName) {
      updates.petName = petName;
    }
    if (image) {
      updates.image = image;
    }
    if (idPetBreed) {
      updates.idPetBreed = idPetBreed;
    }
    if (idPetType) {
      updates.idPetType = idPetType;
    }
    if (idPetColor) {
      updates.idPetColor = idPetColor;
    }
    if (birthDate) {
      updates.birthDate = birthDate;
    }

    updates.updatedDate = new Date();

    await Pet.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}

export async function deletePet(idPet) {
  try {
    await Pet.update(
      { active: false, updatedDate: new Date() },
      { where: { idPet }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function activePet(idPet) {
  try {
    await Pet.update(
      { active: true, updatedDate: new Date() },
      { where: { idPet }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
