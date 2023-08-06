import { PetBreed } from "../../models/PetBreed.js";

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
    const petBreeds = await PetBreed.findAll({
      attributes: ["petBreedName"],
      where: { active: true },
    });
    return petBreeds;
  } catch (error) {
    throw error;
  }
}

export async function getPetBreedById(idPetBreed) {
  try {
    const petBreed = await PetBreed.findOne({
      attributes: ["petBreedName", "idPetBreed"],
      where: { idPetBreed, active: true },
    });

    return petBreed;
  } catch (error) {
    throw error;
  }
}

export async function getPetBreedByName(petBreedName) {
  try {
    const petBreed = await PetBreed.findOne({
      attributes: ["petBreedName", "idPetBreed"],
      where: { petBreedName: petBreedName.toUpperCase(), active: true },
    });

    return petBreed;
  } catch (error) {
    throw error;
  }
}

export async function updatePetBreed(data, idPetBreed) {
  const { petBreedName } = data;
  console.log("object");
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
