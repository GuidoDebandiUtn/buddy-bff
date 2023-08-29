import { Router } from "express";
import {
  getRole,
  getRoles,
  roleActive,
  roleCreate,
  roleDelete,
  roleUpdate,
} from "../controllers/role.controller.js";
import { verifyToken } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: ROLE
 *   description: Endpoints relacionados con los roles
 */

/**
 * @swagger
 * /security/role/:
 *   post:
 *     summary: Crea un nuevo rol
 *     tags: [ROLE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
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
 *         description: Ya existe un rol con ese nombre
 *       500:
 *          description: Hubo un error
 */
router.post("/", verifyToken, roleCreate);

/**
 * @swagger
 * /security/role/:
 *   get:
 *     summary: Obtiene todos los role activos
 *     tags: [ROLE]
 *     responses:
 *       200:
 *         description: Lista de rol activos
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    roleName:
 *                      type: string
 *       404:
 *         description: No existe ningun rol
 *       500:
 *          description: Hubo un error
 */
router.get("/", verifyToken, getRoles);

/**
 * @swagger
 * /security/role/{idRole}:
 *   get:
 *     summary: Obtiene el rol con el id
 *     tags: [ROLE]
 *     responses:
 *       200:
 *         description:
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  roleName:
 *                    type: string
 *
 *       404:
 *         description: No existe ningun rol con este id
 *       500:
 *          description: Hubo un error
 */
router.get("/:idRole", verifyToken, getRole);

/**
 * @swagger
 * /security/role/{idRole}:
 *   put:
 *     summary: Modifica un rol
 *     tags: [ROLE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *     responses:
 *       200:
 *         description: rol modificado exitosamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *        description: Ya existe un rol con ese nombre
 *       404:
 *         description: No existe ningun rol con este id
 *       500:
 *         description: Hubo un error
 */
router.put("/:idRole", verifyToken, roleUpdate);

/**
 * @swagger
 * /security/role/{idRole}:
 *   delete:
 *     summary: Dar de baja un rol
 *     tags: [ROLE]
 *     responses:
 *       201:
 *         description: Se ha dado de baja el rol
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       404:
 *         description: No existe ningun rol con este id
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idRole", verifyToken, roleDelete);

/**
 * @swagger
 * /security/role/active/{idRole}:
 *   post:
 *     summary: Dar de alta un rol
 *     tags: [ROLE]
 *     responses:
 *       201:
 *         description: Se ha dado de alta el rol
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       404:
 *         description: No existe ningun Role con este id
 *       500:
 *          description: Hubo un error
 */
router.post("/active/:idRole", verifyToken, roleActive);

export default router;
