import {
  createInformation,
  deleteInformation,
  getAllInformation,
  getInformationById,
  updateInformation,
} from "../services/information.service.js";

export async function informationCreate(req, res) {
  const { idPet } = req.params;

  try {
    const newInformation = await createInformation(req.body, idPet);

    return res
      .status(201)
      .json({ message: "Se creo exitosamente la información", newInformation });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getInformations(req, res) {
  const { idPet } = req.params;

  try {
    const information = await getAllInformation(idPet);

    if (!information[0]) {
      return res.status(404).json({ message: "No existe información" });
    }

    return res.status(200).json({ information });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getInformation(req, res) {
  const { idInformation } = req.params;

  try {
    const information = await getInformationById(idInformation);

    if (!information[0]) {
      return res
        .status(404)
        .json({ message: "No existe información con ese id" });
    }

    return res.status(200).json({ information });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function informationUpdate(req, res) {
  const { idInformation } = req.params;

  try {
    const information = await getInformationById(idInformation);

    if (!information[0]) {
      return res
        .status(404)
        .json({ message: "No existe información con ese id" });
    }

    await updateInformation(idInformation, req.body);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente la información" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function informationDelete(req, res) {
  const { idInformation } = req.params;

  try {
    const information = await getInformationById(idInformation);

    if (!information[0]) {
      return res
        .status(404)
        .json({ message: "No existe información con ese id" });
    }

    await deleteInformation(idInformation, req.body);

    return res
      .status(200)
      .json({ message: "Se ha dado de baja correctamente la información" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
