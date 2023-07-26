import { Router } from "express";
import {
  countryCreate,
  countryDelete,
  countryUpdate,
  getCountries,
  getCountry,
} from "../controllers/country.controller.js";

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
router.post("/", countryCreate);

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
router.get("/", getCountries);

/**
 * @swagger
 * /parameters/country/{idCountry}:
 *   get:
 *     summary: Obtiene el país por el id
 *     tags: [COUNTRY]
 *     responses:
 *       200:
 *         description: País buscado.
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
router.get("/:idCountry", getCountry);

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
router.put("/:idCountry", countryUpdate);

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
router.delete("/:idCountry", countryDelete);

export default router;
