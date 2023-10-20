import { Province } from "../../models/Province.js";
import { sequelize } from "../../database/database.js";

export async function createProvince(data) {
  const { provinceName, idCountry } = data;

  try {
    const province = await Province.create(
      {
        provinceName: provinceName.toUpperCase(),
        idCountry,
      },
      {
        fields: ["provinceName", "idCountry"],
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
    SELECT provinces.idProvince, provinces.provinceName, countries.countryName
    FROM provinces
    INNER JOIN countries ON provinces.idCountry = countries.idCountry
    WHERE provinces.active = true
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

export async function getEveryProvinces() {
  try {
    const query = `
    SELECT provinces.idProvince, provinces.provinceName, countries.countryName
    FROM provinces
    INNER JOIN countries ON provinces.idCountry = countries.idCountry
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
    SELECT provinces.idProvince, provinces.provinceName, GROUP_CONCAT(regions.regionName), provinces.idCountry
    FROM provinces
    LEFT JOIN regions ON provinces.idProvince = regions.idProvince
    WHERE provinces.idProvince = '${idProvince}'
    GROUP BY provinces.idProvince, provinces.provinceName
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

export async function getProvinceByName(provinceName, idCountry) {
  try {
    const query = `
    SELECT idProvince, provinceName
    FROM provinces
    WHERE provinceName = '${provinceName.toUpperCase()}' and idCountry = '${idCountry}'
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
      { provinceName: provinceName.toUpperCase() },
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
      { active: false },
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
      { active: true },
      { where: { idProvince }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
