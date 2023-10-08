import { Router } from "express";
import {
  getLocalities,
  getLocality,
  localityActive,
  localityCreate,
  localityDelete,
  localityUpdate,
} from "../controllers/locality.controller.js";
import { verifyToken } from "../../security/controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: LOCALITY
 *   description: ABM localidades
 */

/**
 * @swagger
 * /parameters/locality/:
 *  post:
 *    summary: Crea una nueva localidad
 *    tags: [LOCALITY]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              localityName:
 *                type: string
 *              idRegion:
 *                type: UUID
 *    responses:
 *      201:
 *         description: Localidad creada exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      400:
 *        description: Ya existe una localidad con ese nombre
 *      500:
 *        description: Hubo un error
 */
router.post("/",verifyToken, localityCreate);

/**
 * @swagger
 * /parameters/locality/:
 *   get:
 *     summary: Obtiene una lista de localidades activas
 *     tags: [LOCALITY]
 *     responses:
 *       200:
 *         description: Lista de localidades activas.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    localityName:
 *                      type: string
 *       404:
 *         description: No existe ningun país.
 *       500:
 *          description: Hubo un error
 */
router.get("/",verifyToken, getLocalities);

/**
 * @swagger
 * /parameters/locality/{idLocality}:
 *   get:
 *     summary: Obtiene la localidad por el id
 *     tags: [LOCALITY]
 *     responses:
 *       200:
 *         description: Localidad buscada por id.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                localityName:
 *                  type: string
 *       404:
 *         description: No existe ninguna localidad con ese id.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idLocality",verifyToken, getLocality);

/**
 * @swagger
 * /parameters/locality/{idLocality}:
 *   put:
 *     summary: Actualiza una localidad
 *     tags: [LOCALITY]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               localityName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Localidad actualizada exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       400:
 *         description: Ya existe una localidad con ese nombre
 *       404:
 *         description: No existe ninguna localidad con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idLocality",verifyToken, localityUpdate);

/**
 * @swagger
 * /parameters/locality/{idLocality}:
 *   delete:
 *     summary: Dar de baja una localidad
 *     tags: [LOCALITY]
 *     responses:
 *       200:
 *         description: Localidad dada de baja.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ninguna localidad con es id.
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idLocality",verifyToken, localityDelete);

/**
 * @swagger
 * /parameters/locality/active/{idLocality}:
 *   post:
 *     summary: Dar de alta una localidad
 *     tags: [LOCALITY]
 *     responses:
 *       200:
 *         description: Localidad dada de alta.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ninguna localidad con es id.
 *       500:
 *          description: Hubo un error
 */
router.post("/active/:idLocality",verifyToken, localityActive);

export default router;
