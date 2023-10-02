import { Message } from "../../models/Message.js";
import { Chat } from "../../models/Chat.js";

export async function getMessagesByChat(idUser, idChat) {
  try {
    const messages = await Message.findAll({
      where: { idChat: idChat, active: true },
      order: [["createdAt", "ASC"]],
    });

    for (const message of messages) {
      if (message.idUserEmitter !== idUser) {
        message.read = true;
        await message.save();
      }
    }

    return messages;
  } catch (error) {
    console.log(
      "error en la obtención de los mensajes del chat: ",
      idChat,
      error
    );
    throw error;
  }
}

export async function createMessage(idUser, content, idChat) {
  try {
    const chat = await Chat.findByPk(idChat);
    if (!chat) {
      throw {
        message: "Error obteniendo el chat asociado al mensaje",
        code: 400,
      };
    }

    if (chat.idUserEmitter !== idUser && chat.idUserReceptor !== idUser) {
      throw {
        message: "El usuario enviado no participa en el Chat solicitado",
        code: 403,
      };
    }

    const message = await Message.create({
      content,
      idChat,
      idUserEmitter: idUser,
    });

    chat.archivedEmitter = false;
    chat.archivedReceptor = false;
    chat.save();

    return message;
  } catch (error) {
    throw error;
  }
}
