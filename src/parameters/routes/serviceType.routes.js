import { Router } from "express";
import {
  getServiceType,
  getServiceTypes,
  serviceTypeCreate,
  serviceTypeDelete,
  serviceTypeUpdate,
} from "../controllers/serviceType.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: SERVICETYPE
 *   description: ABM tipo de servicios
 */

/**
 * @swagger
 * /parameters/serviceType/:
 *   post:
 *     summary: Crea un nuevo tipo de servicio.
 *     tags: [SERVICETYPE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceTypeName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tipo de servicio creado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Ya existe un tipo de servicio con ese nombre.
 *       500:
 *          description: Hubo un error
 */
router.post("/", serviceTypeCreate);

/**
 * @swagger
 * /parameters/serviceType/:
 *   get:
 *     summary: Obtiene una lista de tipos de servicios activos
 *     tags: [SERVICETYPE]
 *     responses:
 *       200:
 *         description: Lista de tipos de servicios activos.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                    serviceTypeName:
 *                      type: string
 *       404:
 *         description: No existe ningun tipo de servicio.
 *       500:
 *          description: Hubo un error
 */
router.get("/", getServiceTypes);

/**
 * @swagger
 * /parameters/serviceType/{idServiceType}:
 *   get:
 *     summary: Obtiene el tipo de servicio por el id
 *     tags: [SERVICETYPE]
 *     responses:
 *       200:
 *         description: Tipo de servicio buscado por id.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                serviceTypeName:
 *                  type: string
 *                provinceName:
 *                  type: array
 *       404:
 *         description: No existe ningun tipo de servicio con ese id.
 *       500:
 *          description: Hubo un error
 */
router.get("/:idServiceType", getServiceType);

/**
 * @swagger
 * /parameters/serviceType/{idServiceType}:
 *   put:
 *     summary: Actualiza un tipo de servicio
 *     tags: [SERVICETYPE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceTypeName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tipo de servicio actualizado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       400:
 *         description: Ya existe un tipo de servicio con ese nombre
 *       404:
 *         description: No existe ningun tipo de servicio con ese id.
 *       500:
 *          description: Hubo un error
 */
router.put("/:idServiceType", serviceTypeUpdate);

/**
 * @swagger
 * /parameters/serviceType/{idServiceType}:
 *   delete:
 *     summary: Dar de baja un tipo de servicio
 *     tags: [SERVICETYPE]
 *     responses:
 *       200:
 *         description: Tipo de servicio dado de baja.
 *         content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *       404:
 *         description: No existe ningun tipo de servicio con es id.
 *       500:
 *          description: Hubo un error
 */
router.delete("/:idServiceType", serviceTypeDelete);

export default router;
