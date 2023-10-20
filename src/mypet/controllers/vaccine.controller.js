import {
  activeVaccine,
  archiveVaccine,
  createVaccine,
  deleteVaccine,
  getAllVaccines,
  getVaccineById,
  updateVaccine,
} from "../services/vaccine.service.js";
import { getPetById } from "../services/pet.service.js";


const dateRegex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;


export async function vaccineCreate(req, res) {
  const { idPet } = req.params;

  if (!dateRegex.test(req.body.vaccineDate)) {
    console.log ("error en el formato de la fecha de la vacuna: obtenido: %s, esperado AAAA-mm-dd HH:mm:ss",req.body.vaccineDate);
    return res
    .status(400)
    .json({ message: "Error en el formato de fecha" });
  }

  if (req.body.nextVaccineDate && !dateRegex.test(req.body.nextVaccineDate)) {
    console.log ("error en el formato de la fecha de la proxima vacuna: obtenido: %s, esperado AAAA-mm-dd HH:mm:ss",req.body.vaccineDate);
    return res
    .status(400)
    .json({ message: "Error en el formato de fecha" });
  }

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const newVaccine = await createVaccine(req.body, idPet);

    return res
      .status(201)
      .json({ message: "Se ha creado exitosamente la vacuna", newVaccine });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getVaccines(req, res) {
  const { idPet } = req.params;

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const vaccines = await getAllVaccines(idPet);

    if (!vaccines[0]) {
      return res.status(404).json({ message: "No existen vacunas" });
    }

    return res.status(200).json({ vaccines });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getVaccine(req, res) {
  const { idVaccine, idPet } = req.params;

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const vaccine = await getVaccineById(idVaccine);

    if (!vaccine[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna vacuna con ese id" });
    }

    return res.status(200).json({ vaccine });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function vaccineUpdate(req, res) {
  const { idVaccine, idPet } = req.params;


  if (!dateRegex.test(req.body.vaccineDate)) {
    console.log ("error en el formato de la fecha de la vacuna: obtenido: %s, esperado AAAA-mm-dd HH:mm:ss",req.body.vaccineDate);
    return res
    .status(400)
    .json({ message: "Error en el formato de fecha" });
  }

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const vaccine = await getVaccineById(idVaccine);

    if (!vaccine[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna vacuna con ese id" });
    }

    await updateVaccine(idVaccine, req.body);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente la vacuna" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function vaccineDelete(req, res) {
  const { idVaccine, idPet } = req.params;

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const vaccine = await getVaccineById(idVaccine);

    if (!vaccine[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna vacuna con ese id" });
    }

    await deleteVaccine(idVaccine);

    return res
      .status(200)
      .json({ message: "Se ha dado de baja correctamente la vacuna" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function vaccineActive(req, res) {
  const { idVaccine, idPet } = req.params;

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const vaccine = await getVaccineById(idVaccine);

    if (!vaccine[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna vacuna con ese id" });
    }

    await activeVaccine(idVaccine);

    return res
      .status(200)
      .json({ message: "Se ha dado de alta correctamente la vacuna" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function vaccineArchive(req, res) {
  const { idVaccine, idPet } = req.params;

  try {
    const pet = await getPetById(idPet);

    if (!pet[0]) {
      return res
        .status(404)
        .json({ message: "No existe ninguna mascota con ese id" });
    }

    const vaccine = await getVaccineById(idVaccine);

    if (!vaccine[0]) {
      return res
        .status(404)
        .json({ message: "No existe información con ese id" });
    }

    await archiveVaccine(idVaccine, vaccine[0].archive);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente la vacuna" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
