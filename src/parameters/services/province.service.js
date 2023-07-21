import { Province } from "../../models/Province.js";
import { Region } from "../../models/Region.js";

export async function createProvince(provinceName, idCountry) {
  try {
    const province = await Province.create(
      {
        provinceName,
        createdDate: new Date(),
        updatedDate: new Date(),
        countryIdCountry: idCountry,
      },
      {
        fields: [
          "provinceName",
          "createdDate",
          "updatedDate",
          "countryIdCountry",
        ],
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
      where: { provinceName, active: true },
      attributes: ["idProvince", "provinceName"],
    });

    return province;
  } catch (error) {
    throw error;
  }
}

export async function updateProvince(idProvince, provinceName) {
  try {
    await Province.update(
      { provinceName: provinceName, updatedDate: new Date() },
      { where: { idProvince: idProvince }, returning: true }
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
      { where: { idProvince: idProvince }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
