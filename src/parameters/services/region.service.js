import { Region } from "../../models/Region.js";
import { sequelize } from "../../database/database.js";

export async function createRegion(data) {
  const { regionName, idRegion } = data;

  try {
    const region = await Region.create(
      {
        regionName: regionName.toUpperCase(),
        createdDate: new Date(),
        updatedDate: new Date(),
        idRegion,
      },
      {
        fields: ["regionName", "createdDate", "updatedDate", "idRegion"],
      }
    );

    return region;
  } catch (error) {
    throw error;
  }
}

export async function getAllRegions() {
  try {
    const query = `
    SELECT idRegion, regionName
    FROM regions
    WHERE active = true
    `;

    const regions = await sequelize.query(query, {
      model: Region,
      mapToModel: true,
    });

    return regions;
  } catch (error) {
    throw error;
  }
}

export async function getRegionById(idRegion) {
  try {
    const query = `
    SELECT regions.idRegion, regions.regionName, localities.localityName
    FROM regions
    LEFT JOIN localities ON regions.idRegion = localities.idRegion
    WHERE regions.idRegion = '${idRegion}'
    `;

    const region = await sequelize.query(query, {
      model: Region,
      mapToModel: true,
    });

    return region;
  } catch (error) {
    throw error;
  }
}

export async function getRegionByName(regionName) {
  try {
    const query = `
    SELECT idRegion, regionName
    FROM regions
    WHERE regionName = '${regionName.toUpperCase()}'
    `;

    const region = await sequelize.query(query, {
      model: Region,
      mapToModel: true,
    });

    return region;
  } catch (error) {
    throw error;
  }
}

export async function updateRegion(data, idRegion) {
  const { regionName } = data;

  try {
    await Region.update(
      {
        regionName: regionName.toUpperCase(),
        updatedDate: new Date(),
      },
      { where: { idRegion }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function deleteRegion(idRegion) {
  try {
    await Region.update(
      {
        active: false,
        updatedDate: new Date(),
      },
      { where: { idRegion }, returning: true }
    );
  } catch (error) {
    throw error;
  }
}
