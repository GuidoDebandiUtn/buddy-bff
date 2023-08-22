import {
  createUserState,
  deleteUserState,
  getAllUserState,
  getUserStateById,
  getUserStateByName,
  updateUserState,
} from "../services/userState.service.js";

export async function userStateCreate(req, res) {
  try {
    const userState = await getUserStateByName(req.body.userStateName);

    if (userState) {
      return res.status(400).json({
        message: "Ya existe un UserState con ese nombre",
      });
    }

    const newUserState = await createUserState(req.body);

    return res.status(201).json(newUserState);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getUserStates(req, res) {
  try {
    const userStates = await getAllUserState();

    if (!userStates) {
      return res.status(404).json({ message: "No existe ningun UserState" });
    }

    return res.status(200).json(userStates);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function getUserState(req, res) {
  const { idUserState } = req.params;

  try {
    const userState = await getUserStateById(idUserState);

    if (!userState) {
      return res.status(404).json({
        message: "No existe ningun UserState con ese id",
      });
    }

    return res.status(200).json(userState);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function userStateUpdate(req, res) {
  const { idUserState } = req.params;
  try {
    const userState = await getUserStateById(idUserState);

    if (!userState) {
      return res.status(404).json({
        message: "No existe ningun UserState con ese id",
      });
    }

    const duplicate = await getUserStateByName(req.body.userStateName);

    if (duplicate) {
      return res.status(400).json({
        message: "Ya existe un UserState con ese nombre",
      });
    }

    await updateUserState(req.body, userState);

    return res
      .status(200)
      .json({ message: "Se ha actualizado el UserState correctamente" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function userStateDelete(req, res) {
  const { idUserState } = req.params;
  try {
    const userState = await getUserStateById(idUserState);
    if (!userState) {
      return res.status(404).json({
        message: "No existe ningun UserState con ese id",
      });
    }
    await deleteUserState(idUserState);
    return res
      .status(200)
      .json({ message: "Se ha dado de baja este UserState" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
