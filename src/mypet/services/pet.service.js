import { Pet } from "../../models/Pet.js";
import { Vaccine } from "../../models/Vaccine.js";
import { Turn } from "../../models/Turn.js";
import { sequelize } from "../../database/database.js";
import { createNotificationForUser } from "../../reports/service/notifications.services.js";

export async function createPet(data, idUser) {
  const { petName, birthDate, idPetType, idPetBreed, image, idPetColor  } = data;

  try {
    const newPet = await Pet.create(
      {
        petName,
        birthDate,
        idUser,
        idPetType,
        idPetBreed,
        idPetColor,
        image,

      },
      {
        fields: ["petName", "birthDate", "idUser", "idPetType", "idPetBreed","image", "idPetColor" ],
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

        SELECT idPet, petName, birthDate, idPetType, idPetBreed, image, idUser, idPetColor  
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
            SELECT idPet, petName, birthDate, idPetType, idPetBreed, image, idPetColor, idUser
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

export async function notifyUsersForUpcomingEvents() {
  const pets = await getPetsWithUpcomingEvents();
  try {
    for (const pet of pets) {
      const { idUser, turns, vaccines } = pet;

      for (const turn of turns) {
        const turnNotificationContent = `Quedan menos de 24hs para tu turno: ${turn.turnTittle}, prepara todo lo necesario!`;
        await createNotificationForUser(idUser, turnNotificationContent);
      }

      for (const vaccine of vaccines) {
        const vaccineNotificationContent = `Quedan menos de 24hs para la próxima dosis de la vacuna: ${vaccine.vaccineTittle}, prepara todo lo necesario!`;
        await createNotificationForUser(idUser, vaccineNotificationContent);
      }
    }
  } catch (error) {
    console.error('Error notifying users:', error);
    throw error;
  }
}

async function getPetsWithUpcomingEvents() {
  try {
    const allPets = await Pet.findAll({
      include: [
        { 
          model: Turn, as: "turns",
          attributes:["titleTurn","active","turnDate",],
          where: {active: 1,} 
        },
        { 
          model: Vaccine, as: "vaccines",
          attributes:["nextVaccineDate","active","vaccineDate","titleVaccine",],
          where: {active: 1} 
        },
      ],
      where: {active:1}
    });

    const petsWithUpcomingEvents = allPets.map((pet) => {
      const upcomingTurns = pet.turns.filter((turn) => {
        return turn.turnDate > new Date() && turn.turnDate < new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      });

      const upcomingVaccines = pet.vaccines.filter((vaccine) => {
        return (
          vaccine.nextVaccineDate > new Date() &&
          vaccine.nextVaccineDate < new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        );
      });

      return {
        ...pet.get({ plain: true }),
        turns: upcomingTurns.map(turn=>turn.get({plain:true})),
        vaccines: upcomingVaccines.map(vaccine=>vaccine.get({plain:true})),
      };
    });

    return petsWithUpcomingEvents.filter((pet) => pet.turns.length > 0 || pet.vaccines.length > 0);
  } catch (error) {
    console.error('Error fetching pets with events:', error);
    throw error;
  }
}
