import { Vaccine } from "../../models/Vaccine.js";
import { sequelize } from "../../database/database.js";

export async function createVaccine(data, idPet) {
  const { titleVaccine, descriptionVaccine } = data;

  try {
    const newVaccine = await Vaccine.create(
      {
        titleVaccine,
        descriptionVaccine,
        active: true,
        archive: false,
        createdDate: new Date(),
        updatedDate: new Date(),
        idPet,
      },
      {
        fields: [
          "titleVaccine",
          "descriptionVaccine",
          "active",
          "archive",
          "createdDate",
          "updatedDate",
          "idPet",
        ],
      }
    );

    return newVaccine;
  } catch (error) {
    throw error;
  }
}

export async function getAllVaccines(idPet) {
  try {
    const query = `
        SELECT idVaccine, titleVaccine, descriptionVaccine
        FROM vaccines
        WHERE idPet = "${idPet}" and active = true`;

    const vaccines = await sequelize.query(query, {
      model: Vaccine,
      mapToModel: true,
    });

    return vaccines;
  } catch (error) {
    throw error;
  }
}

export async function getVaccineById(idVaccine) {
  try {
    const query = `
        SELECT idVaccine, titleVaccine, descriptionVaccine
        FROM vaccines
        WHERE idVaccine = "${idVaccine}"`;

    const vaccine = await sequelize.query(query, {
      model: Vaccine,
      mapToModel: true,
    });

    return vaccine;
  } catch (error) {
    throw error;
  }
}

export async function updateVaccine(idVaccine, data) {
  const { titleVaccine, descriptionVaccine } = data;

  try {
    const updates = {};
    const updateOptions = { where: { idVaccine } };

    if (titleVaccine) {
      updates.titleVaccine = titleVaccine;
    }

    if (descriptionVaccine) {
      updates.descriptionVaccine = descriptionVaccine;
    }

    updates.updatedDate = new Date();

    await Vaccine.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}

export async function deleteVaccine(idVaccine) {
  try {
    await Vaccine.update(
      { active: false, updatedDate: new Date() },
      { where: { idVaccine }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
