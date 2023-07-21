import { Country } from "../../models/Country.js";
import { Province } from "../../models/Province.js";

export async function createCountry(countryName) {
  try {
    const newCountry = await Country.create(
      {
        countryName,
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
      attributes: ["countryName"],
    });

    return countries;
  } catch (error) {
    throw error;
  }
}

export async function getCountryById(idCountry) {
  try {
    const country = await Country.findOne({
      where: { idCountry },
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
      where: { countryName },
      attributes: ["idCountry", "countryName"],
    });

    return country;
  } catch (error) {
    throw error;
  }
}

export async function updateCountry(countryName, idCountry) {
  try {
    await Country.update(
      { countryName: countryName, updatedDate: new Date() },
      { where: { idCountry: idCountry }, returning: true }
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
