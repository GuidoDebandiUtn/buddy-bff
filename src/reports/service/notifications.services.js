import { User } from "../../models/User.js";
import { Notification } from "../../models/Notification.js";
import { getUsersByRole } from "../../security/services/user.service.js";

export async function retrieveNotificationsByUserDB(idUser) {
  try {
    const notifications = await Notification.findAll({
      where: { idUser: idUser, active: true },
      order: [['createdAt', 'ASC']],
    });

    for (const notification of notifications) {
      notification.readed = true;
      await notification.save();
    }
    return notifications;
  } catch (error) {
    console.log("error en la obtención de las notficaciones del usuario: ", idUser, error);
    throw error;
  }
}



export async function createNotificationForUser(idUser, content) {
  try {
    const user = await User.findByPk(idUser);
    if (!user) {
      throw { message: 'Error obteniendo el chat asociado al mensaje', code: 400 };
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


export async function CreateNotificationForRole(roleName, content) {
  try {
    const users = await getUsersByRole(roleName);
    if (!users || users.length === 0) {
      throw { message: 'No se encontraron usuarios con el rol especificado', code: 400 };
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
    console.log("Error creando notificaciones para los usuarios del rol: ", roleName, error);
    throw error;
  }
}



