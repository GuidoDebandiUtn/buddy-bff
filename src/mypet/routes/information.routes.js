import { Router } from "express";
import {
  getInformation,
  getInformations,
  informationArchive,
  informationCreate,
  informationDelete,
  informationUpdate,
} from "../controllers/information.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: INFO
 *   description: ABM información de una mascota
 */

/**
 * @swagger
 * /mypet/information/{idPet}:
 *  post:
 *    summary: Crea una nueva información de una mascota.
 *    tags: [INFO]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              titleInformation:
 *                type: string
 *              descriptionInformation:
 *                type: string
 *    responses:
 *      201:
 *        description: Información creada exitosamente.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      500:
 *        description: Hubo un error
 */
router.post("/:idPet", informationCreate);

/**
 * @swagger
 * /mypet/information/{idPet}:
 *   get:
 *     summary: Obtiene una lista de información activa de una mascota
 *     tags: [INFO]
 *     responses:
 *       200:
 *         description: Lista de información de una mascota.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    titleInformation:
 *                      type: string
 *                    descriptionInformation:
 *                      type: string
 *       404:
 *         description: No existe ninguna información.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idPet", getInformations);

/**
 * @swagger
 * /mypet/information/{idPet}/{idInformation}:
 *   get:
 *     summary: Obtiene la información por el id
 *     tags: [INFO]
 *     responses:
 *       200:
 *         description: Información buscada por id.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                titleInformation:
 *                  type: string
 *                descriptionInformation:
 *                  type: string
 *       404:
 *         description: No existe ninguna información con ese id.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idPet/:idInformation", getInformation);

/**
 * @swagger
 * /mypet/information/{idPet}/{idInformation}:
 *   put:
 *     summary: Actualiza una información de una mascota
 *     tags: [INFO]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titleInformation:
 *                 type: string
 *               descriptionInformation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Información actualizada exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ninguna información con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idPet/:idInformation", informationUpdate);

/**
 * @swagger
 * /mypet/information/{idPet}/{idInformation}:
 *   delete:
 *     summary: Dar de baja una información de una mascota
 *     tags: [INFO]
 *     responses:
 *       200:
 *         description: Información dada de baja.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ninguna información con es id.
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idPet/:idInformation", informationDelete);

/**
 * @swagger
 * /mypet/information/{idPet}/{idInformation}/archive:
 *   put:
 *     summary: Archiva o desarchiva una información de una mascota
 *     tags: [INFO]
 *     responses:
 *       200:
 *         description: Información actualizada exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ninguna información con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idPet/:idInformation/archive", informationArchive);

export default router;
