import { Turn } from "../../models/Turn.js";
import { sequelize } from "../../database/database.js";

export async function createTurn(data, idPet) {
  const { titleTurn, descriptionTurn, turnDate } = data;

  try {
    const newTurn = await Turn.create(
      {
        titleTurn,
        descriptionTurn,
        turnDate,
        active: true,
        archive: false,
        createdDate: new Date(),
        updatedDate: new Date(),
        idPet,
      },
      {
        fields: [
          "titleTurn",
          "descriptionTurn",
          "turnDate",
          "active",
          "archive",
          "createdDate",
          "updatedDate",
          "idPet",
        ],
      }
    );

    return newTurn;
  } catch (error) {
    throw error;
  }
}

export async function getAllTurns(idPet) {
  try {
    const query = `
        SELECT idTurn, titleTurn, descriptionTurn, DATE_FORMAT(turnDate, '%H:%i') AS turnHour, DATE_FORMAT(turnDate, '%d-%m-%Y') AS turnDate
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

export async function getTurnById(idTurn) {
  try {
    const query = `
            SELECT idTurn, titleTurn, descriptionTurn, DATE_FORMAT(turnDate, '%H:%i') AS turnHour, DATE_FORMAT(turnDate, '%d-%m-%Y') AS turnDate
            FROM turns
            WHERE idTurn = "${idTurn}"`;

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

    updates.updatedDate = new Date();

    await Turn.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}

export async function deleteTurn(idTurn) {
  try {
    await Turn.update(
      { active: false, updatedDate: new Date() },
      { where: { idTurn }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function activeTurn(idTurn) {
  try {
    await Turn.update(
      { active: true, updatedDate: new Date() },
      { where: { idTurn }, returning: true }
    );

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

    updates.updatedDate = new Date();

    await Turn.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}
