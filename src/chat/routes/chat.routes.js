import { Router } from "express";
import { verifyToken } from "../../security/controllers/auth.controller.js";
import { getChatsController, postArchiveChat, postCreateChat } from "../controller/chat.controller.js";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: CHAT
 *   description: Funcionalidades con respecto al Chat.
 */

/**
 * @swagger
 * chat/chat/:archived:
 *   get:
 *     summary: Obtiene los chats de un usuario, especificando si archivados o activos.
 *     parameters:
 *       - in: query
 *         name: archived
 *         schema:
 *           type: boolean
 *         description: bandera para especificar si archivados o activos.
 *     tags: [CHAT]
 *     responses:
 *       200:
 *         description: Chats recuperados correctamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       401:
 *         description: error en el token enviado.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       403:
 *         description: no se cuentan con los permisos necesarios para esta accion
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       500:
 *          description: Error interno del servicio
 */
router.get('/:archived', verifyToken,getChatsController);


/**
 * @swagger
 * chats/chat/:idUserReceptor:
 *   post:
 *     summary: Crea un nuevo chat para los usuarios especificados.
 *     parameters:
 *       - in: path
 *         name: idReference
 *         required: false
 *         schema:
 *           type: uuid
 *         description: Id de referencia a una publicacion, por la que es originado un chat.
 *       - in: path
 *         name: referenceType
 *         required: false
 *         schema:
 *           type: string
 *         description: Tipo de publicacion de la referencia, puede ser Search o Adoption.
 *       - in: query
 *         name: idUserReceptor
 *         schema:
 *           type: uuid
 *         description: uuid del usuario receptor del chat.
 *     tags: [CHAT]
 *     responses:
 *       200:
 *         description: Chat creado correctamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Error en el usuario receptor enviado.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       401:
 *         description: error en el token enviado.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       403:
 *         description: no se cuentan con los permisos necesarios para esta accion
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       500:
 *          description: Error interno del servicio
 */
router.post('/:idUserReceptor', verifyToken, postCreateChat);


/**
 * @swagger
 * chat/chat/archive/:idChat/:archive:
 *   post:
 *     summary: Archiva o desarchiva el chat enviado por parametro para el usuario enviado en el token
 *     parameters:
 *       - in: query
 *         name: idChat
 *         schema:
 *           type: uuid
 *         description: uuid del chat a archivar.
 *       - in: query
 *         name: archive
 *         schema:
 *           type: boolean
 *         description: bandera para archivar o desarchivar el chat.
 *     tags: [CHAT]
 *     responses:
 *       200:
 *         description: Chat archivado correctamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: error en el id de chat enviado.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       401:
 *         description: error en el token enviado.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       403:
 *         description: no se cuentan con los permisos necesarios para esta accion
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       500:
 *          description: Error interno del servicio
 */
router.post('/archive/:idChat/:archive', verifyToken,postArchiveChat);


export default router;