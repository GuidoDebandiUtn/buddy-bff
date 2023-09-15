import { Locality } from "../../models/Locality.js";
import { sequelize } from "../../database/database.js";

export async function createLocality(data) {
  const { localityName, idRegion } = data;

  try {
    const locality = await Locality.create(
      {
        localityName: localityName.toUpperCase(),
        idRegion,
      },
      {
        fields: ["localityName", "idRegion"],
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
    SELECT localities.idLocality, localities.localityName, regions.regionName
    FROM localities
    INNER JOIN regions ON regions.idRegion = localities.idRegion
    WHERE localities.active = true
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
    SELECT idLocality, localityName, idRegion
    FROM localities
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

export async function getLocalityByName(localityName, idRegion) {
  try {
    const query = `
    SELECT idLocality, localityName
    FROM localities
    WHERE localityName = '${localityName.toUpperCase()}' and idRegion = '${idRegion}'
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
      { localityName: localityName.toUpperCase() },
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
      { active: false },
      { where: { idLocality }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function activeLocality(idLocality) {
  try {
    await Locality.update(
      { active: true },
      { where: { idLocality }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
