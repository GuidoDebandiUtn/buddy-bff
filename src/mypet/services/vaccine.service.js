import { Vaccine } from "../../models/Vaccine.js";
import { sequelize } from "../../database/database.js";

export async function createVaccine(data, idPet) {
  const { titleVaccine, descriptionVaccine, vaccineDate,doseQuantity, nextVaccineDate } = data;

  try {

    const now = new Date();
    const nextVaccineDateTime = new Date(nextVaccineDate);
  
    if (nextVaccineDateTime <= now || nextVaccineDateTime - now < 24 * 60 * 60 * 1000) {
      throw {message:"La fecha de la proxima dosis debe ser al menos 24 horas en el futuro.", code: 400};
    }

    const newVaccine = await Vaccine.create(
      {
        titleVaccine,
        descriptionVaccine,
        vaccineDate,
        idPet,
        doseQuantity,
        nextVaccineDate
      },
      {
        fields: ["titleVaccine", "descriptionVaccine", "vaccineDate", "idPet", "doseQuantity", "nextVaccineDate"],
      }
    );

    return newVaccine;
  } catch (error) {
    console.error(`Error en la creacion de una nueva vacuna para la mascota: ${idPet}, error: ${error}`);
    throw error;
  }
}

export async function getAllVaccines(idPet) {
  try {
    const query = `
        SELECT idVaccine, doseQuantity, nextVaccineDate, titleVaccine, descriptionVaccine, archive, DATE_FORMAT(vaccineDate, '%H:%i') AS vaccineHour, DATE_FORMAT(vaccineDate, '%d-%m-%Y') AS vaccineDate
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
        SELECT idVaccine,doseQuantity, nextVaccineDate, titleVaccine, descriptionVaccine, archive, DATE_FORMAT(vaccineDate, '%H:%i') AS vaccineHour, DATE_FORMAT(vaccineDate, '%d-%m-%Y') AS vaccineDate
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
  const { titleVaccine, descriptionVaccine, vaccineDate,doseQuantity, nextVaccineDate } = data;

  try {

    
    const now = new Date();
    const nextVaccineDateTime = new Date(nextVaccineDate);
  
    if (nextVaccineDateTime <= now || nextVaccineDateTime - now < 24 * 60 * 60 * 1000) {
      throw {message:"La fecha de la proxima dosis debe ser al menos 24 horas en el futuro.", code: 400};
    }

    const updates = {};
    const updateOptions = { where: { idVaccine } };

    if (titleVaccine) {
      updates.titleVaccine = titleVaccine;
    }
    if (doseQuantity) {
      updates.doseQuantity = doseQuantity;
    }

    if (descriptionVaccine) {
      updates.descriptionVaccine = descriptionVaccine;
    }

    if (vaccineDate) {
      updates.vaccineDate = vaccineDate;
    }

    if (nextVaccineDate) {
      updates.nextVaccineDate = nextVaccineDate;
    }

    await Vaccine.update(updates, updateOptions);

    return;
  } catch (error) {
    console.error(`Error en la modificacion de la vacuna: ${idVaccine}, error: ${error}`);
    throw error;
  }
}

export async function deleteVaccine(idVaccine) {
  try {
    await Vaccine.update(
      { active: false },
      { where: { idVaccine }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function activeVaccine(idVaccine) {
  try {
    await Vaccine.update(
      { active: true },
      { where: { idVaccine }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function archiveVaccine(idVaccine, archive) {
  try {
    const updates = {};
    const updateOptions = { where: { idVaccine } };
    console.log(archive);
    if (archive) {
      updates.archive = false;
    } else {
      updates.archive = true;
    }

    await Vaccine.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}
