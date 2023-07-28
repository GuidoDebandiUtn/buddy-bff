import { Province } from "../../models/Province.js";
import { Region } from "../../models/Region.js";

export async function createProvince(data) {
  const { provinceName, idCountry } = data;

  try {
    const province = await Province.create(
      {
        provinceName: provinceName.toUpperCase(),
        createdDate: new Date(),
        updatedDate: new Date(),
        idCountry,
      },
      {
        fields: ["provinceName", "createdDate", "updatedDate", "idCountry"],
      }
    );

    return province;
  } catch (error) {
    throw error;
  }
}

export async function getAllProvinces() {
  try {
    const provinces = await Province.findAll({
      where: { active: true },
      attributes: ["provinceName"],
    });

    return provinces;
  } catch (error) {
    throw error;
  }
}

export async function getProvinceById(idProvince) {
  try {
    const province = await Province.findOne({
      where: { idProvince, active: true },
      attributes: ["provinceName"],
      include: {
        model: Region,
        attributes: ["regionName"],
      },
    });

    return province;
  } catch (error) {
    throw error;
  }
}

export async function getProvinceByName(provinceName) {
  try {
    const province = await Province.findOne({
      where: { provinceName: provinceName.toUpperCase(), active: true },
      attributes: ["idProvince", "provinceName"],
    });

    return province;
  } catch (error) {
    throw error;
  }
}

export async function updateProvince(data, idProvince) {
  const { provinceName } = data;
  try {
    await Province.update(
      { provinceName: provinceName.toUpperCase(), updatedDate: new Date() },
      { where: { idProvince }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}

export async function deleteProvince(idProvince) {
  try {
    await Province.update(
      { active: false, updatedDate: new Date() },
      { where: { idProvince }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
