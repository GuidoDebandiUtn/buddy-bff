import { Router } from "express";
import { verifyToken } from "../../security/controllers/auth.controller.js";
import { getNotificationsByUser, postReadNotifications } from "../controller/notifications.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: NOTIFICATIONS
 *   description: Funcionalidades con respecto a las notificaciones.
 */

/**
 * @swagger
 * reports/notifications/:
 *   get:
 *     summary: Obtiene las notificaciones de un usuario.
 *     tags: [NOTIFICATIONS]
 *     responses:
 *       200:
 *         description: Notificaciones recuperadas correctamente.
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
router.get("/",verifyToken,getNotificationsByUser);

/**
 * @swagger
 * reports/notifications/:
 *   post:
 *     summary: Marca como leidas las notificaciones del usuario del token.
 *     tags: [NOTIFICATIONS]
 *     responses:
 *       200:
 *         description: Notificaciones modificadas correctamente.
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
router.post("/",verifyToken,postReadNotifications);

export default router;