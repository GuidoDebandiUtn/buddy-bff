import { Locality } from "../../models/Locality.js";
import { sequelize } from "../../database/database.js";

export async function createLocality(data) {
  const { localityName, idRegion } = data;

  try {
    const locality = await Locality.create(
      {
        localityName: localityName.toUpperCase(),
        createdDate: new Date(),
        updatedDate: new Date(),
        idRegion,
      },
      {
        fields: ["localityName", "createdDate", "updatedDate", "idRegion"],
      }
    );

    return locality;
  } catch (error) {
    throw error;
  }
}

export async function getAllLocalities() {
  try {
    const query = `
    SELECT idLocality, localityName
    FROM countries
    WHERE active = true
    `;

    const localities = await sequelize.query(query, {
      model: Locality,
      mapToModel: true,
    });

    return localities;
  } catch (error) {
    throw error;
  }
}

export async function getLocalityById(idLocality) {
  try {
    const query = `
    SELECT idLocality, localityName
    FROM countries
    WHERE idLocality = '${idLocality}'
    `;

    const locality = await sequelize.query(query, {
      model: Locality,
      mapToModel: true,
    });

    return locality;
  } catch (error) {
    throw error;
  }
}

export async function getLocalityByName(localityName) {
  try {
    const query = `
    SELECT idLocality, localityName
    FROM countries
    WHERE localityName = '${localityName.toUpperCase()}'
    `;

    const locality = await sequelize.query(query, {
      model: Locality,
      mapToModel: true,
    });

    return locality;
  } catch (error) {
    throw error;
  }
}

export async function updateLocality(data, idLocality) {
  const { localityName } = data;

  try {
    await Locality.update(
      { localityName: localityName.toUpperCase(), updatedDate: new Date() },
      { where: { idLocality }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function deleteLocality(idLocality) {
  try {
    await Locality.update(
      { active: false, updatedDate: new Date() },
      { where: { idLocality }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
