import {
  createUserState,
  deleteUserState,
  getAllUserState,
  getUserStateById,
  getUserStateByName,
  updateUserState,
} from "../services/userState.service.js";

export async function userStateCreate(req, res) {
  const { userStateName } = req.body;

  try {
    const userState = await getUserStateByName(userStateName.toUpperCase());

    if (userState) {
      return res.status(404).json({
        message: "Ya existe un UserState con ese nombre",
      });
    }

    const newUserState = await createUserState(userStateName);

    return res.status(201).json(newUserState);
  } catch (error) {
    res.status(500).json({
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
    res.status(500).json({
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
    res.status(500).json({
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

    const { userStateName } = req.body;

    if (await getUserStateByName(userStateName.toUpperCase())) {
      return res.status(404).json({
        message: "Ya existe un UserState con ese nombre",
      });
    }
    await updateUserState(userState, userStateName);

    return res
      .status(200)
      .json({ message: "Se ha actualizado el UserState correctamente" });
  } catch (error) {
    res.status(500).json({
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
    res.status(500).json({
      message: error.message,
    });
  }
}
