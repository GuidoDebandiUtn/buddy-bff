import { Router } from "express";
import {
  getPetType,
  getPetTypes,
  petTypeActive,
  petTypeCreate,
  petTypeDelete,
  petTypeUpdate,
} from "../controllers/petType.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: PETTYPE
 *   description: ABM tipo de mascotas
 */

/**
 * @swagger
 * /parameters/petType/:
 *   post:
 *     summary: Crea un nuevo tipo de mascota.
 *     tags: [PETTYPE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petTypeName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tipo de mascota creado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Ya existe un tipo de mascota con ese nombre.
 *       500:
 *          description: Hubo un error
 */
router.post("/", petTypeCreate);

/**
 * @swagger
 * /parameters/petType/:
 *   get:
 *     summary: Obtiene una lista de tipos de mascotas activos
 *     tags: [PETTYPE]
 *     responses:
 *       200:
 *         description: Lista de tipos de mascotas activos.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    petTypeName:
 *                      type: string
 *       404:
 *         description: No existe ningun tipo de mascota.
 *       500:
 *          description: Hubo un error
 */
router.get("/", getPetTypes);

/**
 * @swagger
 * /parameters/petType/{idPetType}:
 *   get:
 *     summary: Obtiene el tipo de mascota por el id
 *     tags: [PETTYPE]
 *     responses:
 *       200:
 *         description: Tipo de mascota buscado por id.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                petTypeName:
 *                  type: string
 *                provinceName:
 *                  type: array
 *       404:
 *         description: No existe ningun tipo de mascota con ese id.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idPetType", getPetType);

/**
 * @swagger
 * /parameters/petType/{idPetType}:
 *   put:
 *     summary: Actualiza un tipo de mascota
 *     tags: [PETTYPE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petTypeName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tipo de mascota actualizado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       400:
 *         description: Ya existe un tipo de mascota con ese nombre
 *       404:
 *         description: No existe ningun tipo de mascota con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idPetType", petTypeUpdate);

/**
 * @swagger
 * /parameters/petType/{idPetType}:
 *   delete:
 *     summary: Dar de baja un tipo de mascota
 *     tags: [PETTYPE]
 *     responses:
 *       200:
 *         description: Tipo de mascota dado de baja.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ningun tipo de mascota con es id.
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idPetType", petTypeDelete);

/**
 * @swagger
 * /parameters/petType/active/{idPetType}:
 *   post:
 *     summary: Dar de alta un tipo de mascota
 *     tags: [PETTYPE]
 *     responses:
 *       200:
 *         description: Tipo de mascota dado de alta.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ningun tipo de mascota con es id.
 *       500:
 *          description: Hubo un error
 */
router.post("/active/:idPetType", petTypeActive);

export default router;
