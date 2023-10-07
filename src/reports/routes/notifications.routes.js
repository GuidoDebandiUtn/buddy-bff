import { Router } from "express";
import { verifyToken } from "../../security/controllers/auth.controller.js";
import { getNotificationsByUser } from "../controller/notifications.controller.js";

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

export default router;