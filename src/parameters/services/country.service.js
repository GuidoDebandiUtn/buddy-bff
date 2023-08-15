import { Country } from "../../models/Country.js";
import { sequelize } from "../../database/database.js";

export async function createCountry(data) {
  const { countryName } = data;

  try {
    const newCountry = await Country.create(
      {
        countryName: countryName.toUpperCase(),
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      { fields: ["countryName", "active", "createdDate", "updatedDate"] }
    );

    return newCountry;
  } catch (error) {
    throw error;
  }
}

export async function getAllCountries() {
  try {
    const query = `
    SELECT idCountry, countryName
    FROM countries
    WHERE active = true
    `;

    const countries = await sequelize.query(query, {
      model: Country,
      mapToModel: true,
    });

    return countries;
  } catch (error) {
    throw error;
  }
}

export async function getCountryById(idCountry) {
  try {
    const query = `
    SELECT countries.idCountry, countries.countryName, provinces.provinceName
    FROM countries
    LEFT JOIN provinces ON countries.idCountry = provinces.idCountry
    WHERE countries.idCountry = '${idCountry}'
    `;
    // const query = `
    // SELECT idCountry, countryName
    // FROM countries
    // WHERE idCountry = '${idCountry}'
    // `;

    const country = await sequelize.query(query, {
      model: Country,
      mapToModel: true,
    });

    return country;
  } catch (error) {
    throw error;
  }
}

export async function getCountryByName(countryName) {
  try {
    const query = `
    SELECT idCountry, countryName
    FROM countries
    WHERE countryName = '${countryName.toUpperCase()}'
    `;

    const country = await sequelize.query(query, {
      model: Country,
      mapToModel: true,
    });

    return country;
  } catch (error) {
    throw error;
  }
}

export async function updateCountry(data, idCountry) {
  const { countryName } = data;

  try {
    await Country.update(
      { countryName: countryName.toUpperCase(), updatedDate: new Date() },
      { where: { idCountry }, returning: true }
    );
    return;
  } catch (error) {
    throw error;
  }
}

export async function deleteCountry(idCountry) {
  try {
    await Country.update(
      { active: false, updatedDate: new Date() },
      { where: { idCountry }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
