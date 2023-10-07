import { retrieveNotificationsByUserDB } from "../service/notifications.services.js";

export async function getNotificationsByUser(req, res) {
    const idUser = req.user.idUser;
    try {
      const notifications = await retrieveNotificationsByUserDB(idUser);
  
      return res.status(200).json({notifications: notifications});
    } catch (error) {
        if(error.code){
          return res.status(error.code).json({
            message: error.message,
          });
        }
        return res.status(500).json({
          message: error.message,
        });
    }
  
  }