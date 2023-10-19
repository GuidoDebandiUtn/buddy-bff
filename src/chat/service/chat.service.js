import { Chat } from "../../models/Chat.js";
import { Message } from "../../models/Message.js";
import { User } from "../../models/User.js";
import { Op } from "sequelize";
import { getUserById } from "../../security/services/user.service.js";

export async function getChatsByUser(idUser, archived) {
  const archivedValue = archived.toLowerCase() === "true" ? 1 : 0;

  const chats = await Chat.findAll({
    where: {
      [Op.or]: [
        {
          [Op.and]: [
            { idUserEmitter: idUser },
            { archivedEmitter: archivedValue },
          ],
        },
        {
          [Op.and]: [
            { idUserReceptor: idUser },
            { archivedReceptor: archivedValue },
          ],
        },
      ],
    },
    include: [{ model: Message, order: [["createdAt", "DESC"]], limit: 1 }],
  });

  const userIds = [];
  for (const chat of chats) {
    if (chat.idUserEmitter !== idUser) {
      userIds.push(chat.idUserEmitter);
    }
    if (chat.idUserReceptor !== idUser) {
      userIds.push(chat.idUserReceptor);
    }
  }

  const otherUsers = await User.findAll({
    where: {
      idUser: {
        [Op.in]: userIds,
      },
    },
    attributes: ["idUser", "userName", "name", "lastName", "image"],
  });

  const result = chats.map((chat) => {
    const otherUserId =
      chat.idUserEmitter === idUser ? chat.idUserReceptor : chat.idUserEmitter;
    const otherUser = otherUsers.find((user) => user.idUser === otherUserId);
    return {
      chat,
      otherUser,
    };
  });

  return result;
}

export async function createChat(idUserEmitter, idUserReceptor,referenceType,idReference) {
  try {
    
    const userEmitter = await getUserById(idUserEmitter);
    const userReceptor = await getUserById(idUserReceptor);

    if (!userEmitter[0] || !userReceptor[0]) {
      throw { message: "Uno o ambos usuarios no existen", code: 400 };
    }

    if((idReference && !referenceType) || (!idReference && referenceType) ){
      throw { message: "La referencias deben ser creadas con tipo y id", code: 400 };
    }
    if(referenceType){
      referenceType=referenceType.toUpperCase();
    }

    const existingChat = await Chat.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { idUserEmitter: idUserEmitter },
              { idUserReceptor: idUserReceptor },
            ],
          },
          {
            [Op.and]: [
              { idUserEmitter: idUserReceptor },
              { idUserReceptor: idUserEmitter },
            ],
          },
        ],
      },
    });

    if (existingChat) {
      if(existingChat.idReference && idReference){
        throw {
          message: "No es posible crear mas de 1 chat con una persona por una publicacion",
          code: 400,
          chat: existingChat,
        };
      }else{
        if(idReference){
          await existingChat.update(
            { idReference: idReference, referenceType: referenceType },
            { where: {  idChat:existingChat.idChat  } , returning: true}
          );
        }
        throw {
          message: "Ya existe un chat entre esos usuarios",
          code: 200,
          chat: existingChat,
        };
      }
    }
    const chat = await Chat.create({
      idUserEmitter,
      idUserReceptor,
      idReference,
      referenceType,
    });

    return chat;
  } catch (error) {
    throw error;
  }
}

export async function archiveChat(idUser, idChat, archive) {

  const archiveValue = archive.toLowerCase() === "true" ? 1 : 0;

  try {
    const chat = await Chat.findByPk(idChat);

    if (!chat) {
      throw { message: "Error obteniendo el chat del usuario", code: 400 };
    }

    if (chat.idUserEmitter === idUser) {
      chat.archivedEmitter = archiveValue;
    } else if (chat.idUserReceptor === idUser) {
      chat.archivedReceptor = archiveValue;
    } else {
      throw { message: "Error en el usuario enviado", code: 400 };
    }

    await chat.save();

    return chat;
  } catch (error) {
    console.log("Error Archivando el chat: ", idChat, error);
    throw error;
  }
}
