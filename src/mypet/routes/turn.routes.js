import { Router } from "express";
import {
  getTurn,
  getTurns,
  turnActive,
  turnArchive,
  turnCreate,
  turnDelete,
  turnUpdate,
} from "../controllers/turn.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: TURN
 *   description: ABM turnos de una mascota
 */

/**
 * @swagger
 * /mypet/turn/{idPet}:
 *   post:
 *     summary: Crea un nuevo turno
 *     tags: [TURN]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titleTurn:
 *                 type: string
 *               descriptionTurn:
 *                 type: string
 *               turnDate:
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
router.post("/:idPet", turnCreate);

/**
 * @swagger
 * /mypet/turn/{idPet}:
 *   get:
 *     summary: Obtiene una lista de turnos de una mascota
 *     tags: [TURN]
 *     responses:
 *       200:
 *         description: Lista de turnos de una mascota
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    titleTurn:
 *                      type: string
 *                    descriptionTurn:
 *                      type: string
 *                    turnDate:
 *                      type: Date
 *       404:
 *         description: No existe ningun turno.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idPet", getTurns);

/**
 * @swagger
 * /mypet/turn/{idPet}/{idTurn}:
 *   get:
 *     summary: Obtiene el turno por el id
 *     tags: [TURN]
 *     responses:
 *       200:
 *         description: Turno buscada por id.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                titleTurn:
 *                  type: string
 *                descriptionTurn:
 *                 type: string
 *                turnDate:
 *                  type: Date
 *       404:
 *         description: No existe ningun turno con ese id.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idPet/:idTurn", getTurn);

/**
 * @swagger
 * /mypet/turn/{idPet}/{idTurn}:
 *   put:
 *     summary: Actualiza un turno
 *     tags: [TURN]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titleTurn:
 *                 type: string
 *               descriptionTurn:
 *                 type: string
 *               turnDate:
 *                 type: Date
 *     responses:
 *       200:
 *         description: Turno actualizado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ningun turno con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idPet/:idTurn", turnUpdate);

/**
 * @swagger
 * /mypet/turn/{idPet}/{idTurn}:
 *   delete:
 *     summary: Dar de baja un turno
 *     tags: [TURN]
 *     responses:
 *       200:
 *         description: Turno dado de baja.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ningun turno con es id.
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idPet/:idTurn", turnDelete);

/**
 * @swagger
 * /mypet/turn/{idPet}/active/{idTurn}:
 *   post:
 *     summary: Dar de alta un turno
 *     tags: [TURN]
 *     responses:
 *       200:
 *         description: Turno dado de alta.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ningun turno con es id.
 *       500:
 *          description: Hubo un error
 */
router.post("/:idPet/active/:idTurn", turnActive);

/**
 * @swagger
 * /mypet/information/{idPet}/archive/{idTurn}:
 *   put:
 *     summary: Archiva o desarchiva un turno de una mascota
 *     tags: [INFO]
 *     responses:
 *       200:
 *         description: Turno actualizado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ningun turno con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idPet/archive/:idTurn", turnArchive);

export default router;
