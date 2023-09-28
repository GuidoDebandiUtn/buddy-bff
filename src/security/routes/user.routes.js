import { Router } from "express";
import {
  getUsers,
  getUser,
  userUpdate,
  userDelete,
  changeState,
  userCreate,
  changeRole,
  userPermission,
  getUserAll,
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
 * /security/user/register:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
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
router.post("/register", userCreate);

/**
 * @swagger
 * /security/user/all:
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
router.get("/all", verifyToken, getUsers);

/**
 * @swagger
 * /security/user/:
 *   get:
 *     summary: Traer el ususario por id
 *     tags: [USER]
 *     header:
 *       auth-token:
 *         required: true
 *         description: token conteniendo al usuario a encontrar
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
router.get("/", verifyToken, getUser);

/**
 * @swagger
 * /security/user/:
 *   get:
 *     summary: Traer el ususario por id
 *     tags: [USER]
 *     header:
 *       auth-token:
 *         required: true
 *         description: token conteniendo al usuario a encontrar
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
router.get("/every", verifyToken, getUserAll);

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
 * /security/user/changeRole/{idUser}/{roleName}:
 *  post:
 *    summary: Cambiar rol de un usuario
 *    tags: [USER]
 *    responses:
 *      200:
 *        description: Se ha cambiado de rol un usuario exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      404:
 *        description: No se encuentra el usuario al que se le va a cambiar el rol ni el ususario autor
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
router.post("/changeRole/:idUser/:roleName", verifyToken, changeRole);

router.get("/permissions", verifyToken, userPermission);

export default router;
