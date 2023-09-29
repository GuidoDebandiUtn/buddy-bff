import { Router } from "express";
import { verifyToken } from "../../security/controllers/auth.controller.js";
import { getMessagesController, postCreateMessage } from "../controller/message.controller.js";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: MESSAGE
 *   description: Funcionalidades con respecto a los mensajes del Chat.
 */

/**
 * @swagger
 * chat/message/:idChat:
 *   get:
 *     summary: Obtiene los mensajes de un chat especifico.
 *     parameters:
 *       - in: query
 *         name: idChat
 *         schema:
 *           type: uuid
 *         description: uuid del chat asociado a los mensajes.
 *     tags: [MESSAGE]
 *     responses:
 *       200:
 *         description: Mensajes recuperados correctamente.
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
 *       500:
 *          description: Error interno del servicio
 */
router.get('/:idChat', verifyToken,getMessagesController);


/**
 * @swagger
 * chat/message/:idChat:
 *   post:
 *     summary: Crea un nuevo chat para los usuarios especificados.
 *     parameters:
 *       - in: query
 *         name: idChat
 *         schema:
 *           type: uuid
 *         description: uuid del usuario receptor del chat.
 *     tags: [MESSAGE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contente:
 *                 type: String
 *                 description: Contenido del mensaje a crear.
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
 *         description: error en el usuario enviado, no participa en el chat.
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
router.post('/:idChat', verifyToken,postCreateMessage);




export default router;