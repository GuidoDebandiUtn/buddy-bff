import { Router } from "express";
import {
  countryActive,
  countryCreate,
  countryDelete,
  countryUpdate,
  getCountries,
  getCountry,
} from "../controllers/country.controller.js";
import { verifyToken } from "../../security/controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: COUNTRY
 *   description: ABM países
 */

/**
 * @swagger
 * /parameters/country/:
 *   post:
 *     summary: Crea un nuevo país.
 *     tags: [COUNTRY]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               countryName:
 *                 type: string
 *     responses:
 *       201:
 *         description: País creado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Ya existe un país con ese nombre.
 *       500:
 *          description: Hubo un error
 */
router.post("/",verifyToken, countryCreate);

/**
 * @swagger
 * /parameters/country/:
 *   get:
 *     summary: Obtiene una lista de paises activos
 *     tags: [COUNTRY]
 *     responses:
 *       200:
 *         description: Lista de paises activos.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    countryName:
 *                      type: string
 *       404:
 *         description: No existe ningun país.
 *       500:
 *          description: Hubo un error
 */
router.get("/",verifyToken, getCountries);

/**
 * @swagger
 * /parameters/country/{idCountry}:
 *   get:
 *     summary: Obtiene el país por el id
 *     tags: [COUNTRY]
 *     responses:
 *       200:
 *         description: País buscado por id.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                countryName:
 *                  type: string
 *                provinceName:
 *                  type: array
 *       404:
 *         description: No existe ningun país con ese id.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idCountry",verifyToken, getCountry);

/**
 * @swagger
 * /parameters/country/{idCountry}:
 *   put:
 *     summary: Actualiza un país
 *     tags: [COUNTRY]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               countryName:
 *                 type: string
 *     responses:
 *       200:
 *         description: País actualizado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       400:
 *         description: Ya existe un país con ese nombre
 *       404:
 *         description: No existe ningun país con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idCountry",verifyToken, countryUpdate);

/**
 * @swagger
 * /parameters/country/{idCountry}:
 *   delete:
 *     summary: Dar de baja un país
 *     tags: [COUNTRY]
 *     responses:
 *       200:
 *         description: País dado de baja.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ningun país con es id.
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idCountry",verifyToken, countryDelete);

/**
 * @swagger
 * /parameters/country/active/{idCountry}:
 *   post:
 *     summary: Dar de alta un país
 *     tags: [COUNTRY]
 *     responses:
 *       200:
 *         description: País dado de alta.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ningun país con es id.
 *       500:
 *          description: Hubo un error
 */
router.post("/active/:idCountry",verifyToken, countryActive);

export default router;
