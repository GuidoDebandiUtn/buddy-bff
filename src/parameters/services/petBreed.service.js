import { PetBreed } from "../../models/PetBreed.js";
import { PetType } from "../../models/PetType.js";
import { sequelize } from "../../database/database.js";

export async function createPetBreed(data) {
  const { petBreedName, idPetType } = data;

  try {
    const petBreed = await PetBreed.create(
      {
        petBreedName: petBreedName.toUpperCase(),
        idPetType,
      },
      {
        fields: ["petBreedName", "idPetType"],
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

export async function getEveryPetBreed() {
  try {
    const query = `
    SELECT idPetBreed, petBreedName
    FROM petbreeds
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

export async function getPetBreedsByPetType(petTypeName) {
  try {
    const petBreed = await PetBreed.findAll({
      attributes: ["petBreedName", "idPetBreed"],
      include: [
        {
          model: PetType,
          attributes: [],
          where: { petTypeName, active: true },
        },
      ],
      where: {active: true}
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
  const {
    petBreedName,
    size,
    intelligence,
    temperament,
    lifespan,
    specialProperty,
    fur,
  } = data;

  try {
    const updates = {};
    const updateOptions = { where: { idPetBreed } };

    if (petBreedName) {
      updates.petBreedName = petBreedName.toUpperCase();
    }

    if (size) {
      updates.size = size;
    }

    if (intelligence) {
      updates.intelligence = intelligence;
    }

    if (temperament) {
      updates.temperament = temperament;
    }

    if (lifespan) {
      updates.lifespan = lifespan;
    }

    if (specialProperty) {
      updates.specialProperty = specialProperty;
    }

    if (fur) {
      updates.fur = fur;
    }

    await PetBreed.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}

export async function deletePetBreed(idPetBreed) {
  try {
    await PetBreed.update(
      { active: false },
      { where: { idPetBreed }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function activePetBreed(idPetBreed) {
  try {
    await PetBreed.update(
      { active: true },
      { where: { idPetBreed }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
