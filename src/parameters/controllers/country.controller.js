import {
  activeCountry,
  createCountry,
  deleteCountry,
  getAllCountries,
  getCountryById,
  getCountryByName,
  updateCountry,
} from "../services/country.service.js";

export async function countryCreate(req, res) {
  try {
    const duplicate = await getCountryByName(req.body.countryName);

    if (duplicate[0]) {
      return res
        .status(400)
        .json({ message: "Ya existe un pais con este nombre" });
    }

    const country = await createCountry(req.body);

    return res.status(201).json({ country });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getCountries(req, res) {
  try {
    const countries = await getAllCountries();

    if (!countries[0]) {
      return res.status(404).json({ message: "No existe ningun pais" });
    }

    return res.status(200).json({ countries });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getCountry(req, res) {
  const { idCountry } = req.params;

  try {
    const country = await getCountryById(idCountry);

    if (!country[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun país con este id" });
    }

    return res.status(200).json({ country });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function countryUpdate(req, res) {
  const { idCountry } = req.params;

  try {
    const country = await getCountryById(idCountry);
    if (!country[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun país con este id" });
    }

    const duplicate = await getCountryByName(req.body.countryName);

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe un pais con este nombre" });
    }

    await updateCountry(req.body, idCountry);

    return res.status(200).json({ message: "Se ha actualizado correctamente" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function countryDelete(req, res) {
  const { idCountry } = req.params;

  try {
    const country = await getCountryById(idCountry);

    if (!country[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun país con este id" });
    }

    await deleteCountry(idCountry);

    return res.status(200).json({ message: "Se dio de baja el país" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function countryActive(req, res) {
  const { idCountry } = req.params;
  try {
    const country = await getCountryById(idCountry);

    if (!country[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun país con este id" });
    }

    await activeCountry(idCountry);

    return res.status(200).json({ message: "Se ha dado de alta el país" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
