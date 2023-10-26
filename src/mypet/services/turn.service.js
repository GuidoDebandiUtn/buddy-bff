import { Turn } from "../../models/Turn.js";
import { sequelize } from "../../database/database.js";

export async function createTurn(data, idPet) {
  const { titleTurn, descriptionTurn, turnDate } = data;

  const now = new Date();
  const turnDateTime = new Date(turnDate);

  if (turnDateTime <= now || turnDateTime - now < 24 * 60 * 60 * 1000) {
    throw {message:"La fecha del turno debe ser al menos 24 horas en el futuro.", code: 400};
  }

  try {
    const newTurn = await Turn.create(
      {
        titleTurn,
        descriptionTurn,
        turnDate,
        idPet,
      },
      {
        fields: ["titleTurn", "descriptionTurn", "turnDate", "idPet"],
      }
    );

    return newTurn;
  } catch (error) {
    console.error(`Error en la creacion de un nuevo turno para la mascota: ${idPet}, error: ${error}`);
    throw error;
  }
}

export async function getAllTurns(idPet) {
  try {
    const query = `
        SELECT idTurn, titleTurn, descriptionTurn, archive, DATE_FORMAT(turnDate, '%H:%i') AS turnHour, DATE_FORMAT(turnDate, '%d-%m-%Y') AS turnDate
        FROM turns
        WHERE idPet = "${idPet}" and active = true`;

    const turns = await sequelize.query(query, {
      model: Turn,
      mapToModel: true,
    });

    return turns;
  } catch (error) {
    throw error;
  }
}

export async function getTurnById(idTurn, idPet) {
  try {
    const query = `
            SELECT idTurn, titleTurn, descriptionTurn, archive, DATE_FORMAT(turnDate, '%H:%i') AS turnHour, DATE_FORMAT(turnDate, '%d-%m-%Y') AS turnDate
            FROM turns
            WHERE idTurn = "${idTurn}" and idPet = "${idPet}"`;

    const turn = await sequelize.query(query, {
      model: Turn,
      mapToModel: true,
    });

    return turn;
  } catch (error) {
    throw error;
  }
}

export async function updateTurn(idTurn, data) {
  const { titleTurn, descriptionTurn, turnDate } = data;

  try {

    const now = new Date();
    const turnDateTime = new Date(turnDate);
  
    if (turnDateTime <= now || turnDateTime - now < 24 * 60 * 60 * 1000) {
      throw {message:"La fecha del turno debe ser al menos 24 horas en el futuro.", code: 400};
    }

    const updates = {};
    const updateOptions = { where: { idTurn } };

    if (titleTurn) {
      updates.titleTurn = titleTurn;
    }

    if (descriptionTurn) {
      updates.descriptionTurn = descriptionTurn;
    }

    if (turnDate) {
      updates.turnDate = turnDate;
    }

    await Turn.update(updates, updateOptions);

    return;
  } catch (error) {
    console.error(`Error en la actualizacion del turno: ${idTurn}, error: ${error}`);
    throw error;
  }
}

export async function deleteTurn(idTurn) {
  try {
    await Turn.update(
      { active: false },
      { where: { idTurn }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function activeTurn(idTurn) {
  try {
    await Turn.update({ active: true }, { where: { idTurn }, returning: true });

    return;
  } catch (error) {
    throw error;
  }
}

export async function archiveTurn(idTurn, archive) {
  try {
    const updates = {};
    const updateOptions = { where: { idTurn } };

    if (archive) {
      updates.archive = false;
    } else {
      updates.archive = true;
    }

    await Turn.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}
