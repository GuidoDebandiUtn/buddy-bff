import { Router } from "express";
import {
  getRegion,
  getRegions,
  getRegionsEvery,
  regionActive,
  regionCreate,
  regionDelete,
  regionUpdate,
} from "../controllers/region.controller.js";
import { verifyToken } from "../../security/controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: REGION
 *   description: ABM regiones
 */

/**
 * @swagger
 * /parameters/region/:
 *  post:
 *    summary: Crea una nueva región
 *    tags: [REGION]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              regionName:
 *                type: string
 *              idProvince:
 *                type: UUID
 *              surface:
 *                type: UUID
 *              population:
 *                type: UUID
 *    responses:
 *      201:
 *         description: Provincia creada exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      400:
 *        description: Ya existe una región con ese nombre
 *      500:
 *        description: Hubo un error
 */
router.post("/",verifyToken, regionCreate);

/**
 * @swagger
 * /parameters/region/:
 *   get:
 *     summary: Obtiene una lista de regiónes activas
 *     tags: [REGION]
 *     responses:
 *       200:
 *         description: Lista de regiónes activas.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    regionName:
 *                      type: string
 *       404:
 *         description: No existe ningun país.
 *       500:
 *          description: Hubo un error
 */
router.get("/",verifyToken, getRegions);

/**
 * @swagger
 * /parameters/region/{idLocality}:
 *   get:
 *     summary: Obtiene la región por el id
 *     tags: [REGION]
 *     responses:
 *       200:
 *         description: Provincia buscada por id.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                regionName:
 *                  type: string
 *       404:
 *         description: No existe ninguna región con ese id.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idRegion",verifyToken, getRegion);

/**
 * @swagger
 * /parameters/region/{idLocality}:
 *   put:
 *     summary: Actualiza una región
 *     tags: [REGION]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               regionName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Región actualizada exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       400:
 *         description: Ya existe una región con ese nombre
 *       404:
 *         description: No existe ninguna región con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idRegion",verifyToken, regionUpdate);

/**
 * @swagger
 * /parameters/region/{idLocality}:
 *   delete:
 *     summary: Dar de baja una región
 *     tags: [REGION]
 *     responses:
 *       200:
 *         description: Región dada de baja.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ninguna región con es id.
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idRegion",verifyToken, regionDelete);

/**
 * @swagger
 * /parameters/region/active/{idLocality}:
 *   post:
 *     summary: Dar de alta una región
 *     tags: [REGION]
 *     responses:
 *       200:
 *         description: Región dada de alta.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ninguna región con es id.
 *       500:
 *          description: Hubo un error
 */
router.post("/active/:idRegion",verifyToken, regionActive);

/**
 * @swagger
 * /parameters/region/all:
 *   get:
 *     summary: Obtiene una lista de todas las regiones del sistema
 *     tags: [REGION]
 *     responses:
 *       200:
 *         description: Lista de regiónes activas.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    regionName:
 *                      type: string
 *       404:
 *         description: No existe ningun país.
 *       500:
 *          description: Hubo un error
 */
router.get("/all",verifyToken, getRegionsEvery);

export default router;
