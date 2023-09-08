import {
  activePet,
  createPet,
  deletePet,
  getAllPets,
  getPetById,
  getPetByName,
  updatePet,
} from "../services/pet.service.js";
import { getPetTypeById } from "../../parameters/services/petType.service.js";
import { getPetBreedById } from "../../parameters/services/petBreed.service.js";
import { getIdToken } from "../../helpers/authHelper.js";

export async function petCreate(req, res) {
  const idUser = await getIdToken(req.header("auth-token"));

  try {
    const petType = await getPetTypeById(req.body.idPetType);

    if (!petType[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningún tipo de mascota con ese id" });
    }

    if (req.body.idPetBreed) {
      const petBreed = await getPetBreedById(req.body.idPetBreed);

      if (!petBreed[0]) {
        return res
          .status(404)
          .json({ message: "No existe ninguna raza con ese id" });
      }
    }

    // const duplicate = await getPetByName(idUser, req.body.petName);

    // if (duplicate[0]) {
    //   return res
    //     .status(400)
    //     .json({ message: "Ya tienes una mascota activa con ese nombre" });
    // }

    const newPet = await createPet(req.body, idUser);

    return res
      .status(201)
      .json({ message: "Se creó exitosamente la mascota", newPet });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getPets(req, res) {
  const idUser = await getIdToken(req.header("auth-token"));

  try {
    const pets = await getAllPets(idUser);

    if (!pets[0]) {
      return res.status(404).json({ message: "No existen mascotas" });
    }

    return res.status(200).json({ pets });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getPet(req, res) {
  const { idPet } = req.params;

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    return res.status(200).json({ pet });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function petUpdate(req, res) {
  const { idPet } = req.params;

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    if (req.body.idPetType) {
      const petType = await getPetTypeById(req.body.idPetType);

      if (!petType[0]) {
        return res
          .status(404)
          .json({ message: "No existe ningún tipo de mascota con ese id" });
      }
    }

    if (req.body.idPetBreed) {
      const petBreed = await getPetBreedById(req.body.idPetBreed);

      if (!petBreed[0]) {
        return res
          .status(404)
          .json({ message: "No existe ninguna raza con ese id" });
      }
    }

    await updatePet(idPet, req.body);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente la mascota" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function petDelete(req, res) {
  const { idPet } = req.params;

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    await deletePet(idPet);

    return res
      .status(200)
      .json({ message: "Se ha dado de baja correctamente la mascota" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function petActive(req, res) {
  const { idPet } = req.params;

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    await activePet(idPet);

    return res
      .status(200)
      .json({ message: "Se ha dado de alta correctamente la mascota" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
