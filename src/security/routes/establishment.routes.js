import { Router } from "express";
import {
  changeState,
  establishmentCreate,
  establishmentDelete,
  establishmentUpdate,
  getEstablishment,
  getEstablishments,
} from "../controllers/establishment.controller.js";
import { verifyToken } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: ESTABLISHMENT
 *   description: Endpoints relacionados con los establecimientos
 */
/**
 * @swagger
 * /security/auth/register:
 *   post:
 *     summary: Crea un nuevo establecimiento
 *     tags: [ESTABLISHMENT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               establishmentname:
 *                 type: string
 *               mail:
 *                 type: string
 *               password:
 *                  type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Este mail ya se encuentra en uso
 *       500:
 *          description: Hubo un eror
 */
router.post("/register", establishmentCreate);

/**
 * @swagger
 * /security/establishment/:
 *  get:
 *    summary: Obtener todos los establecimientos
 *    tags: [ESTABLISHMENT]
 *    responses:
 *      200:
 *        description: Lista de establecimientos activos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  mail:
 *                    type: string
 *                  establishmentName:
 *                    type: string
 *                  name:
 *                    type: string
 *                  lastName:
 *                    type: string
 *      404:
 *        description: No se ha encotrado ningun establecimiento
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
router.get("/", verifyToken, getEstablishments);

/**
 * @swagger
 * /security/establishment/{idUser}:
 *   get:
 *     summary: Traer el ususario por id
 *     tags: [ESTABLISHMENT]
 *     responses:
 *       200:
 *         description: Devuleve el ususario buscado
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       404:
 *         description: No se econtraron establecimientos
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       500:
 *          description: Hubo un eror
 */
router.get("/:idUser", verifyToken, getEstablishment);

/**
 * @swagger
 * /security/establishment/{idUser}:
 *   put:
 *     summary: Modificar un establecimiento
 *     tags: [ESTABLISHMENT]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               establishmentname:
 *                 type: string
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               password:
 *                  type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       404:
 *         description: No se encontró el establecimiento
 *       500:
 *          description: Hubo un eror
 */
router.put("/:idUser", verifyToken, establishmentUpdate);

/**
 * @swagger
 * /security/establishment/{idUser}:
 *  delete:
 *    summary: Dar de baja un establecimiento
 *    tags: [ESTABLISHMENT]
 *    responses:
 *      200:
 *        description: Se ha dado de baja un establecimiento exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      404:
 *        description: No se ha encotrado ningun establecimiento
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
router.delete("/:idUser", verifyToken, establishmentDelete);

/**
 * @swagger
 * /security/establishment/changeState/{idUser}/{userStateName}:
 *  post:
 *    summary: Cambiar estado de un establecimiento
 *    tags: [ESTABLISHMENT]
 *    responses:
 *      200:
 *        description: Se ha cambiado de estado un establecimiento exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      404:
 *        description: No se encuentra el establecimiento al que se le va a cambiar el estado ni el ususario autor
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
router.post("/changeState/:idUser/:userStateName", verifyToken, changeState);

export default router;
