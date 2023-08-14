import {
  createPetBreed,
  deletePetBreed,
  getAllPetBreeds,
  getPetBreedById,
  getPetBreedByName,
  updatePetBreed,
  getPetBreedsByPetType
} from "../services/petBreed.service.js";
import { getPetTypeById } from "../services/petType.service.js";

export async function petBreedCreate(req, res) {
  try {
    const duplicate = await getPetBreedByName(req.body.petBreedName);

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe una raza de mascota con ese nombre" });
    }

    const petType = await getPetTypeById(req.body.idPetType);

    if (!petType) {
      return res
        .status(404)
        .json({ message: "No existe ningun tipo de mascota con ese id" });
    }

    const petBreed = await createPetBreed(req.body);

    return res.status(201).json({ petBreed });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getPetBreeds(req, res) {
  try {
    const petBreeds = await getAllPetBreeds();
    if (!petBreeds) {
      return res
        .status(404)
        .json({ message: "No existe ninguna raza de mascota" });
    }

    return res.status(200).json({ petBreeds });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getPetBreed(req, res) {
  const { idPetBreed } = req.params;

  try {
    const petBreed = await getPetBreedById(idPetBreed);

    if (!petBreed) {
      return res
        .status(404)
        .json({ message: "No existe ninguna raza de mascota con este id" });
    }

    return res.status(200).json({ petBreed });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function petBreedUpdate(req, res) {
  const { idPetBreed } = req.params;

  try {
    const petBreed = await getPetBreedById(idPetBreed);

    if (!petBreed) {
      return res
        .status(404)
        .json({ message: "No existe la raza de mascota con ese id" });
    }

    const duplicate = await getPetBreedByName(req.body.petBreedName);

    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Ya existe una Raza de mascota con este nombre" });
    }

    await updatePetBreed(req.body, idPetBreed);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente la raza de mascota" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function petBreedDelete(req, res) {
  const { idPetBreed } = req.params;

  try {
    const petBreed = await getPetBreedById(idPetBreed);

    if (!petBreed) {
      return res
        .status(404)
        .json({ message: "No existe la raza de mascota con ese id" });
    }

    await deletePetBreed(idPetBreed);

    return res
      .status(200)
      .json({ message: "Se ha dado de baja correctamente la raza de mascota" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}



export async function getPetBreedsByType(req, res) {
  const { petTypeName } = req.params;

  try {
    const petBreeds = await getPetBreedsByPetType(petTypeName);
    if (!petBreeds) {
      return res
        .status(404)
        .json({ message: "No existen razas asociadas a ese Animal" });
    }

    return res.status(200).json(petBreeds);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}