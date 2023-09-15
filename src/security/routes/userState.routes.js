import { Router } from "express";
import {
  getUserState,
  getUserStates,
  userStateActive,
  userStateCreate,
  userStateDelete,
  userStateUpdate,
} from "../controllers/userState.controller.js";
import { verifyToken } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: USERSTATE
 *   description: Endpoints relacionados con los UserState
 */

/**
 * @swagger
 * /security/userState/:
 *   post:
 *     summary: Crea un nuevo UserState
 *     tags: [USERSTATE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userStateName:
 *                 type: string
 *     responses:
 *       201:
 *         description: UserState creado exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Ya existe un UserState con ese nombre
 *       500:
 *          description: Hubo un error
 */
router.post("/", verifyToken, userStateCreate);

/**
 * @swagger
 * /security/userState/:
 *   get:
 *     summary: Obtiene todos los UserStates activos
 *     tags: [USERSTATE]
 *     responses:
 *       200:
 *         description: Lista de UserState activos
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    userStateName:
 *                      type: string
 *       404:
 *         description: No existe ningun UserState
 *       500:
 *          description: Hubo un error
 */
router.get("/", verifyToken, getUserStates);

/**
 * @swagger
 * /security/userState/{idUserState}:
 *   get:
 *     summary: Obtiene el UserState con el id
 *     tags: [USERSTATE]
 *     responses:
 *       200:
 *         description: UserState
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  userStateName:
 *                    type: string
 *
 *       404:
 *         description: No existe ningun UserState con este id
 *       500:
 *          description: Hubo un error
 */
router.get("/:idUserState", verifyToken, getUserState);

/**
 * @swagger
 * /security/userState/{idUserState}:
 *   put:
 *     summary: Modifica un UserState
 *     tags: [USERSTATE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userStateName:
 *                 type: string
 *     responses:
 *       200:
 *         description: UserState modificado exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *        description: Ya existe un UserState con ese nombre
 *       404:
 *         description: No existe ningun UserState con este id
 *       500:
 *         description: Hubo un error
 */
router.put("/:idUserState", verifyToken, userStateUpdate);

/**
 * @swagger
 * /security/userState/{idUserState}:
 *   delete:
 *     summary: Dar de baja un UserState
 *     tags: [USERSTATE]
 *     responses:
 *       201:
 *         description: Se ha dado de baja el UserState
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       404:
 *         description: No existe ningun UserState con este id
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idUserState", verifyToken, userStateDelete);

/**
 * @swagger
 * /security/userState/active/{idUserState}:
 *   post:
 *     summary: Dar de alta un UserState
 *     tags: [USERSTATE]
 *     responses:
 *       201:
 *         description: Se ha dado de alta el UserState
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       404:
 *         description: No existe ningun UserState con este id
 *       500:
 *          description: Hubo un error
 */
router.post("/active/:idUserState", verifyToken, userStateActive);

export default router;
