import { Router } from "express";
import {
  establishmentUpdate,
  getDocumentsEstablishment,
  getEstablishment,
  getEstablishments,
  getRevisionEstablishments,
  postValidateEstablishment,
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
 * /security/establishment/validateEstablishment/:idUser:
 *  post:
 *    summary: Validar la documentacion del establecimiento y modificar el estado en base a eso
 *     parameters:
 *       - in: query
 *         name: idUser
 *         schema:
 *           type: uuid
 *         description: uuid del usuario a validar.
 *    tags: [ESTABLISHMENT]
 *    responses:
 *      200:
 *        description:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      404:
 *        description:
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
router.post("/validateEstablishment/:idUser", verifyToken, postValidateEstablishment);

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
router.get("/revision", verifyToken, getRevisionEstablishments);

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
router.get("/:idUser", verifyToken, getEstablishment);

router.get("/document/:idUser", verifyToken, getDocumentsEstablishment);

export default router;
