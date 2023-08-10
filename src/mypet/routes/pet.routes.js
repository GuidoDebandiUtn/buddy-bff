import { Router } from "express";
import {
  getPet,
  getPets,
  petCreate,
  petDelete,
  petUpdate,
} from "../controllers/pet.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: PETS
 *   description: ABM mascota
 */

/**
 * @swagger
 * /mypet/pet/{idUser}:
 *   post:
 *     summary: Crea una nueva mascota
 *     tags: [PETS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petName:
 *                 type: string
 *               birthDate:
 *                 type: Date
 *     responses:
 *       201:
 *         description: Mascota creada exitosamente.
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
router.post("/:idUser", petCreate);

/**
 * @swagger
 * /mypet/pet/{idUser}:
 *   get:
 *     summary: Obtiene una lista de mascota activas de un usuario
 *     tags: [PETS]
 *     responses:
 *       200:
 *         description: Lista de mascota
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    petName:
 *                      type: string
 *                    birthDate:
 *                      type: Date
 *       404:
 *         description: No existe ninguna mascota.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idUser", getPets);

/**
 * @swagger
 * /mypet/pet/{idUser}/{idPet}:
 *   get:
 *     summary: Obtiene la mascota por el id
 *     tags: [PETS]
 *     responses:
 *       200:
 *         description: Mascota buscada por id.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                petName:
 *                  type: string
 *                birthDate:
 *                  type: Date
 *       404:
 *         description: No existe ninguna mascota con ese id.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idUser/:idPet", getPet);

/**
 * @swagger
 * /mypet/pet/{idUser}/{idPet}:
 *   put:
 *     summary: Actualiza una mascota
 *     tags: [PETS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petName:
 *                 type: string
 *               birthDate:
 *                 type: Date
 *     responses:
 *       200:
 *         description: Mascota actualizada exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ninguna mascota con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idUser/:idPet", petUpdate);

/**
 * @swagger
 * /mypet/pet/{idUser}/{idPet}:
 *   delete:
 *     summary: Dar de baja una mascota
 *     tags: [PETS]
 *     responses:
 *       200:
 *         description: Mascota dada de baja.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ninguna mascota con es id.
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idUser/:idPet", petDelete);

export default router;
