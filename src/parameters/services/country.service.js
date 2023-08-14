import { Country } from "../../models/Country.js";
import { Province } from "../../models/Province.js";

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
    const countries = await Country.findAll({
      where: { active: true },
      attributes: ["countryName","IdCountry"],
    });

    return countries;
  } catch (error) {
    throw error;
  }
}

export async function getCountryById(idCountry) {
  try {
    const country = await Country.findOne({
      where: { idCountry, active: true },
      attributes: ["countryName"],
      include: {
        model: Province,
        attributes: ["provinceName"],
      },
    });

    return country;
  } catch (error) {
    throw error;
  }
}

export async function getCountryByName(countryName) {
  try {
    const country = await Country.findOne({
      where: { countryName: countryName.toUpperCase(), active: true },
      attributes: ["idCountry", "countryName"],
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
      { where: { idCountry: idCountry }, returning: true }
    );

    return;
  } catch (error) {
    throw error;
  }
}
