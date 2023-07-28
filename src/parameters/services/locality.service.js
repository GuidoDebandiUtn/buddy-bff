import { Locality } from "../../models/Locality.js";

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
    const localities = await Locality.findAll({
      where: { active: true },
      attributes: ["localityName"],
    });

    return localities;
  } catch (error) {
    throw error;
  }
}

export async function getLocalityById(idLocality) {
  try {
    const locality = await Locality.findOne({
      where: { idLocality, active: true },
      attributes: ["localityName"],
    });
    return locality;
  } catch (error) {
    throw error;
  }
}

export async function getLocalityByName(localityName) {
  try {
    const locality = await Locality.findOne({
      where: { localityName: localityName.toUpperCase(), active: true },
      attributes: ["idLocality", "localityName"],
    });

    return locality;
  } catch (error) {
    throw error;
  }
}

export async function updateLocality(idLocality, localityName) {
  try {
    await Locality.update(
      { localityName, updatedDate: new Date() },
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
