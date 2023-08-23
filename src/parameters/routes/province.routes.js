import { Router } from "express";
import {
  getProvince,
  getProvinces,
  provinceCreate,
  provinceDelete,
  provinceUpdate,
} from "../controllers/province.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: PROVINCE
 *   description: ABM provincias
 */

/**
 * @swagger
 * /parameters/province/:
 *  post:
 *    summary: Crea una nueva provincia
 *    tags: [PROVINCE]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              provinceName:
 *                type: string
 *              idCountry:
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
 *        description: Ya existe una provincia con ese nombre
 *      500:
 *        description: Hubo un error
 */
router.post("/", provinceCreate);

/**
 * @swagger
 * /parameters/province/:
 *   get:
 *     summary: Obtiene una lista de provincias activas
 *     tags: [PROVINCE]
 *     responses:
 *       200:
 *         description: Lista de provinciaes activas.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    provinceName:
 *                      type: string
 *       404:
 *         description: No existe ningun país.
 *       500:
 *          description: Hubo un error
 */
router.get("/", getProvinces);

/**
 * @swagger
 * /parameters/province/{idLocality}:
 *   get:
 *     summary: Obtiene la provincia por el id
 *     tags: [PROVINCE]
 *     responses:
 *       200:
 *         description: Provincia buscada por id.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                provinceName:
 *                  type: string
 *       404:
 *         description: No existe ninguna provincia con ese id.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idProvince", getProvince);

/**
 * @swagger
 * /parameters/province/{idLocality}:
 *   put:
 *     summary: Actualiza una provincia
 *     tags: [PROVINCE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provinceName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Provincia actualizada exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       400:
 *         description: Ya existe una provincia con ese nombre
 *       404:
 *         description: No existe ninguna provincia con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idProvince", provinceUpdate);

/**
 * @swagger
 * /parameters/province/{idLocality}:
 *   delete:
 *     summary: Dar de baja una provincia
 *     tags: [PROVINCE]
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
 *         description: No existe ninguna provincia con es id.
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idProvince", provinceDelete);

export default router;
