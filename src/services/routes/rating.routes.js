import { verifyToken } from "../../security/controllers/auth.controller.js";
import { Router } from "express";
import { postNewRating } from "../controllers/rating.controller.js";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: RATINGS
 *   description: ABM valoraciones
 */

/**
 * @swagger
 * /services/rating/:
 *   post:
 *     summary: Crea una nueva valoracion para un servicio
 *     tags: [RATINGS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titleRating:
 *                 type: String
 *                 required: true
 *               descriptionRating:
 *                 type: String
 *                 required: true
 *               numberRating:
 *                 type: Integer
 *                 required: true
 *                 format: 1-5
 *               idService:
 *                 type: Uuid
 *                 required: true
 *     responses:
 *       201:
 *         description: Valoracion creada exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *          description: No se pudo obtener el servicio asociado
 *       500:
 *          description: Hubo un error
 */
router.post("/",verifyToken, postNewRating);







export default router;