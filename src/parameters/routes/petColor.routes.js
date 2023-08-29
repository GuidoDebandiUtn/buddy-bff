import { Router } from "express";
import {
  getPetColor,
  getPetColors,
  petColorActive,
  petColorCreate,
  petColorDelete,
  petColorUpdate,
} from "../controllers/petColor.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: PETCOLOR
 *   description: ABM colores de mascotas
 */

/**
 * @swagger
 * /parameters/petColor/:
 *   post:
 *     summary: Crea un nuevo color de mascota.
 *     tags: [PETCOLOR]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petColorName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Color de mascota creado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Ya existe un color de mascota con ese nombre.
 *       500:
 *          description: Hubo un error
 */
router.post("/", petColorCreate);

/**
 * @swagger
 * /parameters/petColor/:
 *   get:
 *     summary: Obtiene una lista de colores de mascotas activos
 *     tags: [PETCOLOR]
 *     responses:
 *       200:
 *         description: Lista de colores de mascotas activos.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    petColorName:
 *                      type: string
 *       404:
 *         description: No existe ningun color de mascota.
 *       500:
 *          description: Hubo un error
 */
router.get("/", getPetColors);

/**
 * @swagger
 * /parameters/petColor/{idPetColor}:
 *   get:
 *     summary: Obtiene el color de mascota por el id
 *     tags: [PETCOLOR]
 *     responses:
 *       200:
 *         description: Color de mascota buscado por id.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                petColorName:
 *                  type: string
 *                provinceName:
 *                  type: array
 *       404:
 *         description: No existe ningun color de mascota con ese id.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idPetColor", getPetColor);

/**
 * @swagger
 * /parameters/petColor/{idPetColor}:
 *   put:
 *     summary: Actualiza un color de mascota
 *     tags: [PETCOLOR]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petColorName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Color de mascota actualizado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       400:
 *         description: Ya existe un color de mascota con ese nombre
 *       404:
 *         description: No existe ningun color de mascota con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idPetColor", petColorUpdate);

/**
 * @swagger
 * /parameters/petColor/{idPetColor}:
 *   delete:
 *     summary: Dar de baja un color de mascota
 *     tags: [PETCOLOR]
 *     responses:
 *       200:
 *         description: Color de mascota dado de baja.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ningun color de mascota con es id.
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idPetColor", petColorDelete);

/**
 * @swagger
 * /parameters/petColor/active/{idPetColor}:
 *   post:
 *     summary: Dar de alta un color de mascota
 *     tags: [PETCOLOR]
 *     responses:
 *       200:
 *         description: Color de mascota dado de alta.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ningun color de mascota con es id.
 *       500:
 *          description: Hubo un error
 */
router.post("/active/:idPetColor", petColorActive);

export default router;
