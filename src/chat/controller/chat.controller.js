import {
  archiveChat,
  createChat,
  getChatsByUser,
} from "../service/chat.service.js";

export async function getChatsController(req, res) {
  const { archived } = req.params;
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permisos.split(' - ');

  const requiredPermissions = ['READ_CHAT',];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permisos necesarios" });
  }



  try {
    const data = await getChatsByUser(idUser, archived);

    if (!data[0]) {
      return res
        .status(204)
        .json({ message: "No se ha obtenido ningun chat para el usuario" });
    }

    return res.status(200).json(data);
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function postCreateChat(req, res) {
  const { idUserReceptor } = req.params;
  const { referenceType,idReference } = req.query;
  const idUserEmitter = req.user.idUser;
  const userPermissions = req.user.permissions[0].permisos.split(' - ');

  const requiredPermissions = ['READ_CHAT', 'WRITE_CHAT'];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permisos necesarios" });
  }


  try {
    const data = await createChat(idUserEmitter, idUserReceptor,referenceType,idReference);

    return res.status(201).json(data);
  } catch (error) {
    if (error.chat) {
      return res.status(error.code).json({ message:error.message,chat: error.chat });
    }
    if (error.code) {
      return res.status(error.code).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: error.message,
    });
  }
}

export async function postArchiveChat(req, res) {
  const { idChat,archive } = req.params;
  const idUser = req.user.idUser;
  const userPermissions = req.user.permissions[0].permisos.split(' - ');

  const requiredPermissions = ['READ_CHAT', 'WRITE_CHAT'];
  const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasAllPermissions) {
    return res.status(403).json({ message: "No se cuenta con todos los permisos necesarios" });
  }


  try {
    const data = await archiveChat(idUser, idChat,archive);

    return res.status(200).json(data);
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: error.message,
    });
  }
}
