import { Pet } from "../../models/Pet.js";
import { sequelize } from "../../database/database.js";

export async function createPet(data, idUser) {
  const { petName, birthDate, idPetType, idPetBreed } = data;

  try {
    const newPet = await Pet.create(
      {
        petName,
        birthDate,
        idUser,
        idPetType,
        idPetBreed,
        image
      },
      {
        fields: ["petName", "birthDate", "idUser", "idPetType", "idPetBreed","image"],
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
        SELECT idPet, petName, birthDate, idPetType, idPetBreed, image 
        FROM pets
        WHERE idUser = "${idUser}" and active = true
        ORDER BY petName`;

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
            SELECT idPet, petName, birthDate, idPetType, idPetBreed, image
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

export async function getPetByName(idUser, petName) {
  try {
    const query = `
    SELECT * 
    FROM (SELECT UPPER(petName)  FROM pets  WHERE idUser = '${idUser}' and active = true) AS mascotas
    WHERE UPPER('${petName}') IN (SELECT UPPER(petName) FROM pets WHERE idUser = '${idUser}' and active = true) `;

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
  const { petName, birthDate, image, idPetBreed, idPetType, idPetColor } = data;

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
      updates.birthDate = new Date(birthDate);
    }

    await Pet.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}

export async function deletePet(idPet) {
  try {
    await Pet.update({ active: false }, { where: { idPet }, returning: true });

    return;
  } catch (error) {
    throw error;
  }
}

export async function activePet(idPet) {
  try {
    await Pet.update({ active: true }, { where: { idPet }, returning: true });

    return;
  } catch (error) {
    throw error;
  }
}
