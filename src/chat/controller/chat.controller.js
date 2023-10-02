import { archiveChat, createChat, getChatsByUser } from "../service/chat.service.js";

export async function getChatsController(req, res) {
    const { archived } = req.params;
    const idUser = req.user.idUser;

    try {
      const data = await getChatsByUser(idUser,archived);
  
      if (!data) {
        return res.status(204).json({ message: "No se ha obtenido ningun chat para el usuario" });
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


export async function postCreateChat(req, res) {
    const { idUserReceptor } = req.params;
    const idUserEmitter = req.user.idUser;

    try {
      const data = await createChat(idUserEmitter,idUserReceptor);
   
      return res.status(200).json(data);
    }catch (error) {
<<<<<<< HEAD
=======
        if(error.chat){
          return res.status(error.code).json({chat: error.chat});
        }
>>>>>>> c30d24a9ac4bf3f771855eb5642d51271537666e
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


export async function postArchiveChat(req, res) {
    const { idChat } = req.params;
    const idUser = req.user.idUser;

    try {
      const data = await archiveChat(idUser,idChat);
   
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