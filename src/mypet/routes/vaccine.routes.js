import { Router } from "express";
import {
  getVaccine,
  getVaccines,
  vaccineActive,
  vaccineArchive,
  vaccineCreate,
  vaccineDelete,
  vaccineUpdate,
} from "../controllers/vaccine.controller.js";
import { verifyToken } from "../../security/controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: VACCINE
 *   description: ABM vacuna de una mascota
 */

/**
 * @swagger
 * /mypet/vaccine/{idPet}:
 *   post:
 *     summary: Crea una nueva vacuna de una mascota.
 *     tags: [VACCINE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titleVaccine:
 *                 type: string
 *               descriptionVaccine:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vacuna creada exitosamente.
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
router.post("/:idPet",verifyToken, vaccineCreate);

/**
 * @swagger
 * /mypet/vaccine/{idPet}:
 *   get:
 *     summary: Obtiene una lista de vacuna activa de una mascota
 *     tags: [VACCINE]
 *     responses:
 *       200:
 *         description: Lista de vacuna de una mascota.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    titleVaccine:
 *                      type: string
 *                    descriptionVaccine:
 *                      type: string
 *       404:
 *         description: No existe ninguna vacuna.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idPet",verifyToken, getVaccines);

/**
 * @swagger
 * /mypet/vaccine/{idPet}/{idVaccine}:
 *   get:
 *     summary: Obtiene la vacuna por el id
 *     tags: [VACCINE]
 *     responses:
 *       200:
 *         description: Vacuna buscada por id.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                titleVaccine:
 *                  type: string
 *                descriptionVaccine:
 *                  type: string
 *       404:
 *         description: No existe ninguna vacuna con ese id.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idPet/:idVaccine",verifyToken, getVaccine);

/**
 * @swagger
 * /mypet/vaccine/{idPet}/{idVaccine}:
 *   put:
 *     summary: Actualiza una vacuna de una mascota
 *     tags: [VACCINE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titleVaccine:
 *                 type: string
 *               descriptionVaccine:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vacuna actualizada exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ninguna vacuna con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idPet/:idVaccine",verifyToken, vaccineUpdate);

/**
 * @swagger
 * /mypet/vaccine/{idPet}/{idVaccine}:
 *   delete:
 *     summary: Dar de baja una vacuna de una mascota
 *     tags: [VACCINE]
 *     responses:
 *       200:
 *         description: Vacuna dada de baja.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ninguna vacuna con es id.
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idPet/:idVaccine",verifyToken, vaccineDelete);

/**
 * @swagger
 * /mypet/vaccine/{idPet}/active/{idVaccine}:
 *   post:
 *     summary: Dar de alta una vacuna de una mascota
 *     tags: [VACCINE]
 *     responses:
 *       200:
 *         description: Vacuna dada de alta.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ninguna vacuna con es id.
 *       500:
 *          description: Hubo un error
 */
router.post("/:idPet/active/:idVaccine",verifyToken, vaccineActive);

/**
 * @swagger
 * /mypet/information/{idPet}/archive/{idVaccine}:
 *   put:
 *     summary: Archiva o desarchiva una vacuna de una mascota
 *     tags: [INFO]
 *     responses:
 *       200:
 *         description: Vacuna actualizada exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ninguna vacuna con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idPet/archive/:idVaccine",verifyToken, vaccineArchive);

export default router;
