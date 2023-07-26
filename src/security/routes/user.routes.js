import { Router } from "express";
import {
  getUsers,
  getUser,
  userUpdate,
  userDelete,
  changeState,
  resetPassword,
  changePassword,
} from "../controllers/user.controller.js";
import { verifyToken } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: USER
 *   description: Endpoints relacionados con los usuarios
 */

/**
 * @swagger
 * /security/user/:
 *  get:
 *    summary: Obtener todos los usuarios
 *    tags: [USER]
 *    responses:
 *      200:
 *        description: Lista de usuarios activos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  mail:
 *                    type: string
 *                  userName:
 *                    type: string
 *                  name:
 *                    type: string
 *                  lastName:
 *                    type: string
 *      404:
 *        description: No se ha encotrado ningun usuario
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
router.get("/", verifyToken, getUsers);

/**
 * @swagger
 * /security/user/{idUser}:
 *   get:
 *     summary: Traer el ususario por id
 *     tags: [USER]
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
 *         description: No se econtraron usuarios
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
router.get("/:idUser", verifyToken, getUser);

/**
 * @swagger
 * /security/user/{id}:
 *   put:
 *     summary: Modificar un usuario
 *     tags: [USER]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
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
 *         description: No se encontró el usuario
 *       500:
 *          description: Hubo un eror
 */
router.put("/:idUser", verifyToken, userUpdate);

/**
 * @swagger
 * /security/user/{idUser}:
 *  delete:
 *    summary: Dar de baja un usuario
 *    tags: [USER]
 *    responses:
 *      200:
 *        description: Se ha dado de baja un usuario exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      404:
 *        description: No se ha encotrado ningun usuario
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
router.delete("/:idUser", verifyToken, userDelete);

/**
 * @swagger
 * /security/user/changeState/{idUser}/{userStateName}:
 *  post:
 *    summary: Cambiar estado de un usuario
 *    tags: [USER]
 *    responses:
 *      200:
 *        description: Se ha cambiado de estado un usuario exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      404:
 *        description: No se encuentra el usuario al que se le va a cambiar el estado ni el ususario autor
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

/**
 * @swagger
 * /security/user/resetPassword/:
 *  post:
 *    summary: Para mandar mail para cambiar contraseña
 *    tags: [USER]
 *    responses:
 *      200:
 *        description: Se ha enviado el mail
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      404:
 *        description: No se encuentra el usuario
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
router.post("/resetPassword", verifyToken, resetPassword);

/**
 * @swagger
 * /security/user/changeState/{idUser}:
 *  put:
 *    summary: Dar de baja un usuario
 *    tags: [USER]
 *    requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *    responses:
 *      200:
 *        description: Se ha cambiado la contraseña
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      404:
 *        description: No se encuentra el usuario al que se le va a cambiar el estado ni el ususario autor
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
router.put("/changePassword/:idUser", verifyToken, changePassword);

export default router;
