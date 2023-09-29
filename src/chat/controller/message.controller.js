import { createMessage, getMessagesByChat } from "../service/message.service.js";



export async function getMessagesController(req, res) {
    const { idChat } = req.params;
    const idUser = req.user.idUser;

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