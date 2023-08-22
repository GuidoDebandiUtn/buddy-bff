import { Information } from "../../models/Information.js";
import { sequelize } from "../../database/database.js";

export async function createInformation(data, idPet) {
  const { titleInformation, descriptionInformation } = data;

  try {
    const newInformation = await Information.create(
      {
        titleInformation,
        descriptionInformation,
        active: true,
        archive: false,
        createdDate: new Date(),
        updatedDate: new Date(),
        idPet,
      },
      {
        fields: [
          "titleInformation",
          "descriptionInformation",
          "active",
          "archive",
          "createdDate",
          "updatedDate",
          "idPet",
        ],
      }
    );

    return newInformation;
  } catch (error) {
    throw error;
  }
}

export async function getAllInformation(idPet) {
  try {
    const query = `
        SELECT idInformation, titleInformation, descriptionInformation, archive
        FROM information
        WHERE idPet = "${idPet}" and active = true`;

    const information = await sequelize.query(query, {
      model: Information,
      mapToModel: true,
    });

    return information;
  } catch (error) {
    throw error;
  }
}

export async function getInformationById(idInformation) {
  try {
    const query = `
            SELECT idInformation, titleInformation, descriptionInformation, archive
            FROM information
            WHERE idInformation = "${idInformation}"`;

    const information = await sequelize.query(query, {
      model: Information,
      mapToModel: true,
    });

    return information;
  } catch (error) {
    throw error;
  }
}

export async function updateInformation(idInformation, data) {
  const { titleInformation, descriptionInformation } = data;
  try {
    const updates = {};
    const updateOptions = { where: { idInformation } };

    if (titleInformation) {
      updates.titleInformation = titleInformation;
    }

    if (descriptionInformation) {
      updates.descriptionInformation = descriptionInformation;
    }

    updates.updatedDate = new Date();

    await Information.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}

export async function deleteInformation(idInformation) {
  try {
    await Information.update(
      { active: false, updatedDate: new Date() },
      { where: { idInformation }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function archiveInformation(idInformation, archive) {
  try {
    const updates = {};
    const updateOptions = { where: { idInformation } };

    if (archive) {
      updates.archive = false;
    } else {
      updates.archive = true;
    }

    updates.updatedDate = new Date();

    await Information.update(updates, updateOptions);

    return;
  } catch (error) {
    throw error;
  }
}
