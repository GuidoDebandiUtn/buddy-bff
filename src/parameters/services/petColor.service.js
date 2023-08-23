import { PetColor } from "../../models/PetColor.js";
import { sequelize } from "../../database/database.js";

export async function createPetColor(data) {
  const { petColorName } = data;

  try {
    const petColor = await PetColor.create(
      {
        petColorName: petColorName.toUpperCase(),
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      { fields: ["petColorName", "active", "createdDate", "updatedDate"] }
    );

    return petColor;
  } catch (error) {
    throw error;
  }
}

export async function getAllPetColors() {
  try {
    const query = `
    SELECT idPetColor, petColorName
    FROM petcolors
    WHERE active = true
    `;

    const petColors = await sequelize.query(query, {
      model: PetColor,
      mapToModel: true,
    });

    return petColors;
  } catch (error) {
    throw error;
  }
}

export async function getPetColorById(idPetColor) {
  try {
    const query = `
    SELECT idPetColor, petColorName
    FROM petcolors
    WHERE idPetColor = '${idPetColor}'
    `;

    const petColor = await sequelize.query(query, {
      model: PetColor,
      mapToModel: true,
    });

    return petColor;
  } catch (error) {
    throw error;
  }
}

export async function getPetColorByName(petColorName) {
  try {
    const query = `
    SELECT idPetColor, petColorName
    FROM petcolors
    WHERE petColorName = '${petColorName.toUpperCase()}'
    `;

    const petColor = await sequelize.query(query, {
      model: PetColor,
      mapToModel: true,
    });

    return petColor;
  } catch (error) {
    throw error;
  }
}

export async function updatePetColor(data, idPetColor) {
  const { petColorName } = data;

  try {
    await PetColor.update(
      { petColorName: petColorName.toUpperCase(), updatedDate: new Date() },
      { where: { idPetColor }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function deletePetColor(idPetColor) {
  try {
    await PetColor.update(
      { active: false, updatedDate: new Date() },
      { where: { idPetColor }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
