import {
  createCountry,
  deleteCountry,
  getAllCountries,
  getCountryById,
  getCountryByName,
  updateCountry,
} from "../services/country.service.js";

export async function countryCreate(req, res) {
  const { countryName } = req.body;

  try {
    const duplicate = await getCountryByName(countryName.toUpperCase());

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe un pais con este nombre" });
    }

    const country = await createCountry(countryName.toUpperCase());

    return res.status(201).json({ country });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getCountries(req, res) {
  try {
    const countries = await getAllCountries();

    if (!countries) {
      return res.status(404).json({ message: "No existe ningun pais" });
    }

    return res.status(200).json({ countries });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getCountry(req, res) {
  const { idCountry } = req.params;

  try {
    const country = await getCountryById(idCountry);

    if (!country) {
      return res
        .status(404)
        .json({ message: "No existe ningun país con este id" });
    }

    return res.status(200).json({ country });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function countryUpdate(req, res) {
  const { idCountry } = req.params;
  const { countryName } = req.body;

  try {
    const duplicate = await getCountryByName(countryName.toUpperCase());

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe un pais con este nombre" });
    }

    const country = await getCountryById(idCountry);
    if (!country) {
      return res
        .status(404)
        .json({ message: "No existe ningun país con este id" });
    }

    await updateCountry(countryName.toUpperCase(), idCountry);

    return res.status(200).json({ message: "Se ha actualizado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function countryDelete(req, res) {
  const { idCountry } = req.params;

  try {
    const country = await getCountryById(idCountry);

    if (!country) {
      return res
        .status(404)
        .json({ message: "No existe ningun país con este id" });
    }

    await deleteCountry(idCountry);

    return res.status(200).json({ message: "Se dio de baja el país" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
