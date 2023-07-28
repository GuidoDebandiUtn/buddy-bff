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
    const petTypes = await PetType.findAll({
      attributes: ["petTypeName"],
      where: { active: true },
    });

    return petTypes;
  } catch (error) {
    throw error;
  }
}

export async function getPetTypeById(idPetType) {
  try {
    const petType = await PetType.findOne({
      attributes: ["idPetType", "petTypeName"],
      where: { idPetType, active: true },
    });

    return petType;
  } catch (error) {
    throw error;
  }
}

export async function getPetTypeByName(petTypeName) {
  try {
    const petType = await PetType.findOne({
      attributes: ["idPetType", "petTypeName"],
      where: { petTypeName, active: true },
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
