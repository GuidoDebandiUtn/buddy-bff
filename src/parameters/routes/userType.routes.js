import { Router } from "express";
import {
  getUserType,
  getUserTypes,
  userTypeCreate,
  userTypeDelete,
  userTypeUpdate,
} from "../controllers/userType.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: USERTYPE
 *   description: ABM tipo de usuarios
 */

/**
 * @swagger
 * /parameters/userType/:
 *   post:
 *     summary: Crea un nuevo tipo de usuario.
 *     tags: [USERTYPE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userTypeName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tipo de usuario creado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Ya existe un tipo de usuario con ese nombre.
 *       500:
 *          description: Hubo un error
 */
router.post("/", userTypeCreate);

/**
 * @swagger
 * /parameters/userType/:
 *   get:
 *     summary: Obtiene una lista de tipos de usuarios activos
 *     tags: [USERTYPE]
 *     responses:
 *       200:
 *         description: Lista de tipos de usuarios activos.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    userTypeName:
 *                      type: string
 *       404:
 *         description: No existe ningun tipo de usuario.
 *       500:
 *          description: Hubo un error
 */
router.get("/", getUserTypes);

/**
 * @swagger
 * /parameters/userType/{idUserType}:
 *   get:
 *     summary: Obtiene el tipo de usuario por el id
 *     tags: [USERTYPE]
 *     responses:
 *       200:
 *         description: Tipo de usuario buscado por id.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                userTypeName:
 *                  type: string
 *                provinceName:
 *                  type: array
 *       404:
 *         description: No existe ningun tipo de usuario con ese id.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idUserType", getUserType);

/**
 * @swagger
 * /parameters/userType/{idUserType}:
 *   put:
 *     summary: Actualiza un tipo de usuario
 *     tags: [USERTYPE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userTypeName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tipo de usuario actualizado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       400:
 *         description: Ya existe un tipo de usuario con ese nombre
 *       404:
 *         description: No existe ningun tipo de usuario con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idUserType", userTypeUpdate);

/**
 * @swagger
 * /parameters/userType/{idUserType}:
 *   delete:
 *     summary: Dar de baja un tipo de usuario
 *     tags: [USERTYPE]
 *     responses:
 *       200:
 *         description: Tipo de usuario dado de baja.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ningun tipo de usuario con es id.
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idUserType", userTypeDelete);

export default router;
