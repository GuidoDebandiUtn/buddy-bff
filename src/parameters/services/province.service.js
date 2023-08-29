import { Province } from "../../models/Province.js";
import { sequelize } from "../../database/database.js";

export async function createProvince(data) {
  const { provinceName, idProvince } = data;

  try {
    const province = await Province.create(
      {
        provinceName: provinceName.toUpperCase(),
        createdDate: new Date(),
        updatedDate: new Date(),
        idProvince,
      },
      {
        fields: ["provinceName", "createdDate", "updatedDate", "idProvince"],
      }
    );

    return province;
  } catch (error) {
    throw error;
  }
}

export async function getAllProvinces() {
  try {
    const query = `
    SELECT idProvince, provinceName
    FROM provinces
    WHERE active = true
    `;

    const provinces = await sequelize.query(query, {
      model: Province,
      mapToModel: true,
    });

    return provinces;
  } catch (error) {
    throw error;
  }
}

export async function getProvinceById(idProvince) {
  try {
    const query = `
    SELECT provinces.idProvince, provinces.provinceName, regions.regionName
    FROM provinces
    LEFT JOIN provinces ON provinces.idProvince = regions.idProvince
    WHERE provinces.idProvince = '${idProvince}'
    `;

    const province = await sequelize.query(query, {
      model: Province,
      mapToModel: true,
    });

    return province;
  } catch (error) {
    throw error;
  }
}

export async function getProvinceByName(provinceName) {
  try {
    const query = `
    SELECT idProvince, provinceName
    FROM provinces
    WHERE provinceName = '${provinceName.toUpperCase()}'
    `;

    const province = await sequelize.query(query, {
      model: Province,
      mapToModel: true,
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

export async function activeProvince(idProvince) {
  try {
    await Province.update(
      { active: true, updatedDate: new Date() },
      { where: { idProvince }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
