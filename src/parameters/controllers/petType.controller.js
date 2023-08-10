import {
  createPetType,
  deletePetType,
  getAllPetTypes,
  getPetTypeById,
  getPetTypeByName,
  updatePetType,
} from "../services/petType.service.js";

export async function petTypeCreate(req, res) {
  try {
    const duplicate = await getPetTypeByName(req.body.petTypeName);

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe un Tipo de mascota con este nombre" });
    }

    const petType = await createPetType(req.body);

    return res.status(201).json({ petType });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getPetTypes(req, res) {
  try {
    const petTypes = await getAllPetTypes();

    if (!petTypes) {
      return res
        .status(404)
        .json({ message: "No existe ningun tipo de mascota" });
    }

    return res.status(200).json({ petTypes });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getPetType(req, res) {
  const { idPetType } = req.params;

  try {
    const petType = await getPetTypeById(idPetType);

    if (!petType) {
      return res
        .status(404)
        .json({ message: "No existe el tipo de mascota con ese id" });
    }

    return res.status(200).json({ petType });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function petTypeUpdate(req, res) {
  const { idPetType } = req.params;

  try {
    const petType = await getPetTypeById(idPetType);

    if (!petType) {
      return res
        .status(404)
        .json({ message: "No existe el tipo de mascota con ese id" });
    }

    const duplicate = await getPetTypeByName(req.body.petTypeName);

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe un Tipo de mascota con este nombre" });
    }

    await updatePetType(req.body, idPetType);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente el tipo de mascota" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function petTypeDelete(req, res) {
  const { idPetType } = req.params;

  try {
    const petType = await getPetTypeById(idPetType);

    if (!petType) {
      return res
        .status(404)
        .json({ message: "No existe el tipo de mascota con ese id" });
    }

    await deletePetType(idPetType);

    return res
      .status(200)
      .json({ message: "Se ha dado de baja correctamente el tipo de mascota" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
