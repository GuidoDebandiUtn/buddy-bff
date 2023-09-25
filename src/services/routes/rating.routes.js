import { verifyToken } from "../../security/controllers/auth.controller.js";
import { Router } from "express";
import { deleteRating, getRatingsByService, postNewRating, putRating } from "../controllers/rating.controller.js";


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


/**
 * @swagger
 * /services/rating/:idService:
 *   get:
 *     summary: Obtiene las calificaciones activas de un servicio
 *     tags: [RATINGS]
 *     parameters:
 *       - in: query
 *         name: idService
 *         schema:
 *           type: uuid
 *         description: Id del servicio referido a ls calificaciones.
 *     responses:
 *       200:
 *         description: Calificaciones recuperadas exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       204:
 *          description: El servicio no tiene ninguna calificacion publicada.
 *       500:
 *          description: Hubo un error interno en el servicio
 */
router.get("/:idService",verifyToken, getRatingsByService);



/**
 * @swagger
 * /services/rating/:idRating:
 *   delete:
 *     summary: elimina una calificacion
 *     tags: [RATINGS]
 *     parameters:
 *       - in: query
 *         name: idRating
 *         schema:
 *           type: uuid
 *         description: Id de la calificacion a eliminar.
 *     responses:
 *       200:
 *         description: Calificacion eliminada exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       500:
 *          description: Hubo un error interno en el servicio
 */
router.delete("/:idRating",verifyToken, deleteRating);



/**
 * @swagger
 * /services/rating/:idRating:
 *   put:
 *     summary: Modifica una nueva valoracion ya creada
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
 *                 required: false
 *               descriptionRating:
 *                 type: String
 *                 required: false
 *               numberRating:
 *                 type: Integer
 *                 required: false
 *                 format: 1-5
 *     responses:
 *       200:
 *         description: Valoracion modificada exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *          description: No se pudo obtener la calificacion solicitada
 *       500:
 *          description: Hubo un error interno en el sistema
 */
router.put("/:idRating",verifyToken, putRating);




export default router;