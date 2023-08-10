import { Pet } from "../../models/Pet.js";
import { sequelize } from "../../database/database.js";

export async function createPet(data, idUser) {
  const { petName, birthDate } = data;

  try {
    const newPet = await Pet.create(
      {
        petName,
        birthDate,
        active: true,
        createdDate: new Date(),
        updatedDate: new Date(),
        idUser,
      },
      {
        fields: [
          "petName",
          "birthDate",
          "active",
          "createdDate",
          "updatedDate",
          "idUser",
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
        SELECT petName, birthDate
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
            SELECT petName, birthDate
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
  const { petName, birthDate } = data;
  try {
    const updates = {};
    const updateOptions = { where: { idPet } };

    if (petName) {
      updates.petName = petName;
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
