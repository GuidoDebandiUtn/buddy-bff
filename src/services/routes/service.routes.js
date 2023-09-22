import { verifyToken } from "../../security/controllers/auth.controller.js";
import { Router } from "express";
import { createService } from "../services/service.service.js";
import { serviceCreate } from "../controllers/service.controller.js";



/**
 * @swagger
 * tags:
 *   name: SERVICES
 *   description: ABM servicios
 */



/**
 * @swagger
 * /services/service/:
 *   post:
 *     summary: Crea una nuevo servicio
 *     tags: [SERVICES]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceTitle:
 *                 type: String
 *                 required: true
 *               serviceDescription:
 *                 type: String
 *                 required: true
 *               openTime:
 *                 type: Time
 *                 required: true
 *                 format: HH:mm:ss
 *               closeTime:
 *                 type: Time
 *                 required: true
 *                 format: HH:mm:ss
 *               address:
 *                 type: String
 *                 required: true
 *               open24hs:
 *                 type: Boolean
 *                 required: true
 *               emailService:
 *                 type: String
 *                 required: true
 *               images:
 *                 type: Text
 *                 required: false
 *               PetTypes:
 *                 type: Array
 *                 required: true
 *     responses:
 *       201:
 *         description: Servicio creado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       500:
 *          description: Hubo un error
 */
router.post("/",verifyToken, serviceCreate);