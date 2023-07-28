import { Region } from "../../models/Region.js";
import { Locality } from "../../models/Locality.js";

export async function createRegion(data) {
  const { regionName, idProvince } = data;

  try {
    const region = await Region.create(
      {
        regionName: regionName.toUpperCase(),
        createdDate: new Date(),
        updatedDate: new Date(),
        idProvince,
      },
      {
        fields: ["regionName", "createdDate", "updatedDate", "idProvince"],
      }
    );

    return region;
  } catch (error) {
    throw error;
  }
}

export async function getAllRegions() {
  try {
    const regions = await Region.findAll({
      where: { active: true },
      attributes: ["regionName"],
    });

    return regions;
  } catch (error) {
    throw error;
  }
}

export async function getRegionById(idRegion) {
  try {
    const region = await Region.findOne({
      where: { idRegion, active: true },
      attributes: ["regionName"],
      include: {
        model: Locality,
        attributes: ["localityName"],
      },
    });
    return region;
  } catch (error) {
    throw error;
  }
}

export async function getRegionByName(regionName) {
  try {
    const region = await Region.findOne({
      where: { regionName: regionName.toUpperCase(), active: true },
      attributes: ["idRegion", "regionName"],
    });
    return region;
  } catch (error) {
    throw error;
  }
}

export async function updateRegion(idRegion, regionName) {
  try {
    await Region.update(
      {
        regionName,
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
