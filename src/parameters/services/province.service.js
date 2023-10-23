import { Province } from "../../models/Province.js";
import { sequelize } from "../../database/database.js";

export async function createProvince(data) {
  const { provinceName, idCountry, weather,population,surface, populationDensity } = data;
  

  try {
    const province = await Province.create(
      {
        provinceName: provinceName.toUpperCase(),
        idCountry, weather,population,surface, populationDensity,
      },
      {
        fields: ["provinceName", "idCountry", "weather","population","surface", "populationDensity"],
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
    SELECT provinces.idProvince, provinces.provinceName, countries.countryName, provinces.weather,provinces.population,provinces.surface, provinces.populationDensity
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
    SELECT provinces.idProvince, provinces.provinceName, provinces.weather,provinces.population,provinces.surface, provinces.populationDensity, GROUP_CONCAT(regions.regionName) as regions, provinces.idCountry
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
    SELECT idProvince, provinceName, weather,population,surface, populationDensity,idCountry
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
  const { provinceName, weather,population,surface, populationDensity } = data;

  const updateOptions = { where: { idProvince }, returning: true };
  
  const updates = {
    ...(data.provinceName && { provinceName: provinceName.toUpperCase() }),
    ...(data.weather && { weather: weather }),
    ...(data.population && { population: population }),
    ...(data.surface && { surface: surface }),
    ...(data.populationDensity && { populationDensity: populationDensity }),
  };

  try {
    await Province.update(
      updates,
      updateOptions
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
