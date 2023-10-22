import { createMessage, getMessagesByChat } from "../service/message.service.js";



export async function getMessagesController(req, res) {
    const { idChat } = req.params;
    const idUser = req.user.idUser;
    const userPermissions = req.user.permissions;
  
    const requiredPermissions = ['READ_MENSAJES'];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }
  

    try {
      const data = await getMessagesByChat(idUser,idChat);
  
      if (!data) {
        return res.status(204).json({ message: "No se ha obtenido ningun mensaje para el chat" });
      }
  
      return res.status(200).json(data);
    }catch (error) {
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


export async function postCreateMessage(req, res) {
    const { idChat } = req.params;
    const messageBody = req.body;
    const idUser = req.user.idUser;    
    const userPermissions = req.user.permissions;
  
    const requiredPermissions = ['READ_MENSAJES','WRITE_MENSAJES'];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }
  

    try {
      const data = await createMessage(idUser,messageBody.content,idChat);
   
      return res.status(200).json(data);
    }catch (error) {
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