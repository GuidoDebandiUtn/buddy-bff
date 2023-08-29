import {
  activePetColor,
  createPetColor,
  deletePetColor,
  getAllPetColors,
  getPetColorById,
  getPetColorByName,
  updatePetColor,
} from "../services/petColor.service.js";

export async function petColorCreate(req, res) {
  try {
    const duplicate = await getPetColorByName(req.body.petColorName);

    if (duplicate[0]) {
      return res.status(400).json({
        message: "Ya existe un color de mascota con ese nombre",
      });
    }

    const petColor = await createPetColor(req.body);

    return res.status(201).json({ petColor });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getPetColors(req, res) {
  try {
    const petColors = await getAllPetColors();

    if (!petColors[0]) {
      return res.status(404).json({
        message: "No existe ningún color de mascota",
      });
    }

    return res.status(200).json({ petColors });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getPetColor(req, res) {
  const { idPetColor } = req.params;
  try {
    const petColor = await getPetColorById(idPetColor);

    if (!petColor[0]) {
      return res.status(404).json({
        message: "No existe ningún color de mascota con ese id",
      });
    }

    return res.status(200).json({ petColor });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function petColorUpdate(req, res) {
  const { idPetColor } = req.params;
  try {
    const petColor = await getPetColorById(idPetColor);

    if (!petColor[0]) {
      return res.status(404).json({
        message: "No existe ningún color de mascota con ese id",
      });
    }

    const duplicate = await getPetColorByName(req.body.petColorName);

    if (duplicate[0]) {
      return res.status(400).json({
        message: "Ya existe un color de mascota con ese nombre",
      });
    }

    await updatePetColor(req.body, idPetColor);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente el color de mascota" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function petColorDelete(req, res) {
  const { idPetColor } = req.params;
  try {
    const petColor = await getPetColorById(idPetColor);

    if (!petColor[0]) {
      return res.status(404).json({
        message: "No existe ningún color de mascota con ese id",
      });
    }

    await deletePetColor(idPetColor);

    return res.status(200).json({
      message: "Se ha dado de baja correctamente el color de mascota",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function petColorActive(req, res) {
  const { idPetColor } = req.params;

  try {
    const petColor = await getPetColorById(idPetColor);

    if (!petColor[0]) {
      return res.status(404).json({
        message: "No existe ningún color de mascota con ese id",
      });
    }

    await activePetColor(idPetColor);

    return res.status(200).json({
      message: "Se ha dado de alta correctamente el color de mascota",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
