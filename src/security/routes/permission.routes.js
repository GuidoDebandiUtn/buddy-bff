import { Router } from "express";
import {
  getPermission,
  getPermissions,
  permissionActive,
  permissionCreate,
  permissionDelete,
  permissionUpdate,
} from "../controllers/permission.controller.js";
import { verifyToken } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: PERMISSION
 *   description: Endpoints relacionados con los permisos
 */

/**
 * @swagger
 * /security/permission/:
 *   post:
 *     summary: Crea un nuevo permiso
 *     tags: [PERMISSION]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissionName:
 *                 type: string
 *               permissionDescription:
 *                 type: string
 *               tokenClaim:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Ya existe un permiso con ese nombre
 *       500:
 *          description: Hubo un error
 */
router.post("/", verifyToken, permissionCreate);

/**
 * @swagger
 * /security/permission/:
 *   get:
 *     summary: Obtiene todos los permission activos
 *     tags: [PERMISSION]
 *     responses:
 *       200:
 *         description: Lista de permiso activos
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    permissionName:
 *                      type: string
 *       404:
 *         description: No existe ningun permiso
 *       500:
 *          description: Hubo un error
 */
router.get("/", verifyToken, getPermissions);

/**
 * @swagger
 * /security/permission/{idPermission}:
 *   get:
 *     summary: Obtiene el permiso con el id
 *     tags: [PERMISSION]
 *     responses:
 *       200:
 *         description:
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  permissionName:
 *                    type: string
 *
 *       404:
 *         description: No existe ningun permiso con este id
 *       500:
 *          description: Hubo un error
 */
router.get("/:idPermission", verifyToken, getPermission);

/**
 * @swagger
 * /security/permission/{idPermission}:
 *   put:
 *     summary: Modifica un permiso
 *     tags: [PERMISSION]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissionName:
 *                 type: string
 *               permissionDescription:
 *                 type: string
 *               tokenClaim:
 *                 type: string
 *     responses:
 *       200:
 *         description: permiso modificado exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *        description: Ya existe un permiso con ese nombre
 *       404:
 *         description: No existe ningun permiso con este id
 *       500:
 *         description: Hubo un error
 */
router.put("/:idPermission", verifyToken, permissionUpdate);

/**
 * @swagger
 * /security/permission/{idPermission}:
 *   delete:
 *     summary: Dar de baja un permiso
 *     tags: [PERMISSION]
 *     responses:
 *       201:
 *         description: Se ha dado de baja el permiso
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       404:
 *         description: No existe ningun permiso con este id
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idPermission", verifyToken, permissionDelete);

/**
 * @swagger
 * /security/permission/active/{idPermission}:
 *   post:
 *     summary: Dar de alta un permiso
 *     tags: [PERMISSION]
 *     responses:
 *       201:
 *         description: Se ha dado de alta el permiso
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       404:
 *         description: No existe ningun permiso con este id
 *       500:
 *          description: Hubo un error
 */
router.post("/active/:idPermission", verifyToken, permissionActive);

export default router;
