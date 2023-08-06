import { Router } from "express";
import {
  login,
  logout,
  validateUser,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: AUTH
 *   description: Endpoints relacionados con la autenticación, creación, log y validación
 */

/**
 * @swagger
 * /security/auth/login:
 *  post:
 *     summary: Iniciar sesion en la aplicación.
 *     tags: [AUTH]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario inició sesión
 *       400:
 *         description: Este usuario aun no se ha validado
 *       404:
 *         description: No existe un usuario con este mail
 *       500:
 *          description: Hubo un eror
 */
router.post("/login", login);

/**
 * @swagger
 * /security/auth/logout:
 *  post:
 *     summary: Cerrar sesión en la aplicación.
 *     tags: [AUTH]
 *     responses:
 *       200:
 *         description: Usuario cerró sesión
 *       500:
 *          description: Hubo un eror
 */
router.post("/logout", logout);

/**
 * @swagger
 * /security/auth/validateAccount/{id}:
 *  get:
 *     summary: Validar cuenta en la aplicación.
 *     tags: [AUTH]
 *     parameters:
 *      - in: path
 *        name: id
 *     responses:
 *       200:
 *         description: Se ha validado el usuario
 *       404:
 *         description: No se encontró el ususario
 *       500:
 *          description: Hubo un eror
 */
router.get("/validateAccount/:idUser", validateUser);

/**
 * @swagger
 * /security/auth/resetPassword/:
 *  post:
 *    summary: Para mandar mail para cambiar contraseña
 *    tags: [AUTH]
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
router.post("/resetPassword", resetPassword);

export default router;
