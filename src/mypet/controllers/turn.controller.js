import {
  createTurn,
  deleteTurn,
  getAllTurns,
  getTurnById,
  updateTurn,
} from "../services/turn.service.js";

export async function turnCreate(req, res) {
  const { idPet } = req.params;
  try {
    const newTurn = await createTurn(req.body, idPet);

    return res
      .status(201)
      .json({ message: "Se creo exitosamente el turno", newTurn });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getTurns(req, res) {
  const { idPet } = req.params;

  try {
    const turns = await getAllTurns(idPet);

    if (!turns[0]) {
      return res.status(404).json({ message: "No existen turnos" });
    }

    return res.status(200).json({ turns });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getTurn(req, res) {
  const { idTurn } = req.params;

  try {
    const turn = await getTurnById(idTurn);

    if (!turn[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun turno con ese id" });
    }

    return res.status(200).json({ turn });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function turnUpdate(req, res) {
  const { idTurn } = req.params;

  try {
    const turn = await getTurnById(idTurn);

    if (!turn[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun turno con ese id" });
    }

    await updateTurn(idTurn, req.body);

    return res
      .status(200)
      .json({ message: "Se ha actualizado correctamente el turno" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function turnDelete(req, res) {
  const { idTurn } = req.params;

  try {
    const turn = await getTurnById(idTurn);

    if (!turn[0]) {
      return res
        .status(404)
        .json({ message: "No existe ningun turno con ese id" });
    }

    await deleteTurn(idTurn);

    return res
      .status(200)
      .json({ message: "Se ha dado de baja correctamente el turno" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
