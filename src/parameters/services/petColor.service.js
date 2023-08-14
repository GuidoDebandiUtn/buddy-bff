import { PetColor } from "../../models/PetColor.js";

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
    const petColors = await PetColor.findAll({
      attributes: ["idPetColor","petColorName"],
      where: { active: true },
    });

    return petColors;
  } catch (error) {
    throw error;
  }
}

export async function getPetColorById(idPetColor) {
  try {
    const petColor = await PetColor.findOne({
      attributes: ["petColorName", "idPetColor"],
      where: { idPetColor, active: true },
    });

    return petColor;
  } catch (error) {
    throw error;
  }
}

export async function getPetColorByName(petColorName) {
  try {
    const petColor = await PetColor.findOne({
      attributes: ["petColorName", "idPetColor"],
      where: { petColorName: petColorName.toUpperCase(), active: true },
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
