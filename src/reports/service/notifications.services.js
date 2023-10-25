import { User } from "../../models/User.js";
import { Notification } from "../../models/Notification.js";
import { getUsersByPermission, getUsersByRole, getUsersBylocality } from "../../security/services/user.service.js";
import log  from "../../helpers/loggerHelper.js";

export async function retrieveNotificationsByUserDB(idUser) {
  try {
    const notifications = await Notification.findAll({
      where: { idUser: idUser, active: true },
      order: [['createdAt', 'DESC']],
    });

    return notifications;
  } catch (error) {
    log('error',`error en la obtención de las notficaciones del usuario: ${idUser}, error: ${error}`);
    throw error;
  }
}



export async function createNotificationForUser(idUser, content) {
  try {
    const user = await User.findByPk(idUser);
    if (!user) {
      throw { message: `Error obteniendo el usuario a notificar, valor idUser: ${idUser}`, code: 400 };
    }

    const notification = await Notification.create({
      content,
      idUser,
    });

    return notification;
  } catch (error) {
    throw error;
  }
}


export async function createNotificationForPermission(tokenClaim, content) {
  try {
    const users = await getUsersByPermission(tokenClaim);
    if (!users || users.length === 0) {
      throw { message: 'No se encontraron usuarios con el permiso especificado', code: 400 };
    }

    const notifications = [];
    for (const user of users) {
      const notification = await Notification.create({
        content,
        idUser: user.idUser,
      });

      notifications.push(notification);
    };

    return notifications;
  } catch (error) {
    log('error',`Error creando notificaciones para los usuarios del permiso: ${tokenClaim}, error: ${error}`);
    throw error;
  }
}


export async function createNotificationForZone(idLocality, content) {
  try {
    const users = await getUsersBylocality(idLocality);
    if (!users || users.length === 0) {
      throw { message: 'No se encontraron usuarios para la localidad especificada', code: 400 };
    }

    const notifications = [];
    for (const user of users) {
      const notification = await Notification.create({
        content,
        idUser: user.idUser,
      });

      notifications.push(notification);
    }

    return notifications;
  } catch (error) {
    log('error',`Error creando notificaciones para los usuarios de la localidad: ${tokenClaim}, error: ${error}`);

    throw error;
  }
}



export async function readNotificationsForUser(idUser) {
  try {
    const notifications = await Notification.findAll({
      where: { idUser: idUser, active: true },
    });

    for (const notification of notifications) {
      notification.readed = true;
      await notification.save();
    }
  } catch (error) {
    log('error',`error en la modificacion de las notificaciones del usuario: ${idUser}, error: ${error}`);
    throw error;
  }
}