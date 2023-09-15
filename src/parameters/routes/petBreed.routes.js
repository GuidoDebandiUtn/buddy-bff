import { Router } from "express";
import {
  getPetBreed,
  getPetBreeds,
  petBreedCreate,
  petBreedDelete,
  petBreedUpdate,
  getPetBreedsByType,
  petBreedActive,
} from "../controllers/petBreed.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: PETBREED
 *   description: ABM razas de mascotas
 */

/**
 * @swagger
 * /parameters/petBreed/:
 *   post:
 *     summary: Crea una nueva raza de mascota.
 *     tags: [PETBREED]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petBreedName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Raza creada exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object|
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Ya existe una raza con ese nombre.
 *       500:
 *          description: Hubo un error
 */
router.post("/", petBreedCreate);

/**
 * @swagger
 * /parameters/petBreed/:
 *   get:
 *     summary: Obtiene una lista de razas de mascotas activas
 *     tags: [PETBREED]
 *     responses:
 *       200:
 *         description: Lista de razas activas.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    petBreedName:
 *                      type: string
 *       404:
 *         description: No existe ninguna raza.
 *       500:
 *          description: Hubo un error
 */
router.get("/", getPetBreeds);

/**
 * @swagger
 * /parameters/petBreed/byId/{idPetBreed}:
 *   get:
 *     summary: Obtiene la raza por el id
 *     tags: [PETBREED]
 *     responses:
 *       200:
 *         description: Raza buscada por id.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                petBreedName:
 *                  type: string
 *                provinceName:
 *                  type: array
 *       404:
 *         description: No existe ninguna raza con ese id.
 *       500:
 *          description: Hubo un error
 */
router.get("/byId/:idPetBreed", getPetBreed);

/**
 * @swagger
 * /parameters/petBreed/{idPetBreed}:
 *   put:
 *     summary: Actualiza una raza
 *     tags: [PETBREED]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petBreedName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Raza actualizada exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       400:
 *         description: Ya existe una raza con ese nombre
 *       404:
 *         description: No existe ninguna raza con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idPetBreed", petBreedUpdate);

/**
 * @swagger
 * /parameters/petBreed/{idPetBreed}:
 *   delete:
 *     summary: Dar de baja una raza
 *     tags: [PETBREED]
 *     responses:
 *       200:
 *         description: Raza dada de baja.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ninguna raza con es id.
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idPetBreed", petBreedDelete);

/**
 * @swagger
 * /parameters/petBreed/active/{idPetBreed}:
 *   post:
 *     summary: Dar de alta una raza
 *     tags: [PETBREED]
 *     responses:
 *       200:
 *         description: Raza dada de alta.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ninguna raza con es id.
 *       500:
 *          description: Hubo un error
 */
router.post("/active/:idPetBreed", petBreedActive);

/**
 * @swagger
 * /parameters/petBreed/byType/{petTypeName}:
 *   get:
 *     summary: Obtiene una lista de razas de un tipo de animal especifico
 *     tags: [PETBREED]
 *     responses:
 *       200:
 *         description: Obtiene una lista de razas de un tipo de animal especifico
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    petTypeName:
 *                      type: string
 *       404:
 *         description: No existe ninguna raza.
 *       500:
 *          description: Hubo un error
 */
router.get("/byType/:petTypeName", getPetBreedsByType);

export default router;
