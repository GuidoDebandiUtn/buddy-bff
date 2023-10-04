import { verifyToken } from "../../security/controllers/auth.controller.js";
import { Router } from "express";
import {
  getServices,
  getServicesByUser,
  serviceCreate,
  serviceDelete,
  serviceUpdate,
  getServiceTypes,
  getEveryServices,
  getService,
} from "../controllers/service.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: SERVICES
 *   description: ABM servicios
 */

/**
 * @swagger
 * /services/service/:
 *   post:
 *     summary: Crea una nuevo servicio
 *     tags: [SERVICES]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceTitle:
 *                 type: String
 *                 required: true
 *               serviceDescription:
 *                 type: String
 *                 required: true
 *               openTime:
 *                 type: Time
 *                 required: true
 *                 format: HH:mm:ss
 *               closeTime:
 *                 type: Time
 *                 required: true
 *                 format: HH:mm:ss
 *               address:
 *                 type: String
 *                 required: true
 *               open24hs:
 *                 type: Boolean
 *                 required: true
 *               emailService:
 *                 type: String
 *                 required: true
 *               images:
 *                 type: Text
 *                 required: false
 *               idServiceType:
 *                 type: String
 *                 required: true
 *               idLocality:
 *                 type: String
 *                 required: true
 *               petTypes:
 *                 type: Array
 *                 required: true
 *     responses:
 *       201:
 *         description: Servicio creado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *          description: Ya existe el servicio que se quiere crear u error en parametros pasados
 *       500:
 *          description: Hubo un error
 */
router.post("/", verifyToken, serviceCreate);

/**
 * @swagger
 * /services/service/ByUser:
 *   get:
 *     summary: Obtiene los servicios referidos a un usuario
 *     tags: [SERVICES]
 *     responses:
 *       200:
 *         description: Servicios recuperados exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       204:
 *          description: El usuario no tiene ningun servicio publicado.
 *       500:
 *          description: Hubo un error
 */
router.get("/ByUser", verifyToken, getServicesByUser);

/**
 * @swagger
 * /services/service/:
 *   get:
 *     summary: Obtiene todos los servicios activos
 *     tags: [SERVICES]
 *     responses:
 *       200:
 *         description: Servicios recuperados exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       204:
 *          description: No existen servicios activos.
 *       500:
 *          description: Hubo un error
 */
router.get("/", verifyToken, getServices);

/**
 * @swagger
 * /services/service/:
 *   get:
 *     summary: Obtiene todos los servicios activos
 *     tags: [SERVICES]
 *     responses:
 *       200:
 *         description: Servicios recuperados exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       204:
 *          description: No existen servicios activos.
 *       500:
 *          description: Hubo un error
 */
router.get("/every", verifyToken, getEveryServices);

/**
 * @swagger
 * /services/service/:idService:
 *   put:
 *     summary: Modifica un servicio
 *     tags: [SERVICES]
 *
 *     parameters:
 *       - in: query
 *         name: idService
 *         schema:
 *           type: uuid
 *         description: Id del servicio a modificar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceTitle:
 *                 type: String
 *                 required: false
 *               serviceDescription:
 *                 type: String
 *                 required: true
 *               openTime:
 *                 type: Time
 *                 required: false
 *                 format: HH:mm:ss
 *               closeTime:
 *                 type: Time
 *                 required: false
 *                 format: HH:mm:ss
 *               address:
 *                 type: String
 *                 required: false
 *               open24hs:
 *                 type: Boolean
 *                 required: false
 *               emailService:
 *                 type: String
 *                 required: false
 *               images:
 *                 type: Text
 *                 required: false
 *               idServiceType:
 *                 type: String
 *                 required: false
 *               idLocality:
 *                 type: String
 *                 required: false
 *               petTypes:
 *                 type: Array
 *                 required: false
 *     responses:
 *       200:
 *         description: Servicio modificado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *          description: Error en los parametros pasado
 *       500:
 *          description: Hubo un error
 */
router.put("/:idService", verifyToken, serviceUpdate);

/**
 * @swagger
 * /services/service/:idService:
 *   delete:
 *     summary: Elimina un servicio
 *     tags: [SERVICES]
 *     parameters:
 *       - in: query
 *         name: idService
 *         schema:
 *           type: uuid
 *         description: Id del servicio a eliminar.
 *     responses:
 *       200:
 *         description: Servicio eliminado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *          description: Error en el idService pasado
 *       404:
 *          description: No se ha encontrado el servicio a eliminar
 *       500:
 *          description: Hubo un error interno en sistema
 */
router.delete("/:idService", verifyToken, serviceDelete);

/**
 * @swagger
 * /services/service/types:
 *   get:
 *     summary: Obtiene los tipos existentes para un servicio
 *     tags: [SERVICES]
 *     responses:
 *       200:
 *         description: Tipos recuperados exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       204:
 *          description: No existen tipos activos.
 *       500:
 *          description: Hubo un error interno
 */
router.get("/types", verifyToken, getServiceTypes);


/**
 * @swagger
 * /services/service/:idService:
 *   get:
 *     summary: Obtiene un servicio a traves de un Id.
 *     tags: [SERVICES]
 *     parameters:
 *       - in: query
 *         name: idService
 *         schema:
 *           type: uuid
 *         description: Id del servicio a obtener.
 *     responses:
 *       200:
 *         description: servicio recuperado exitosamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       204:
 *          description: No existen tipos activos.
 *       500:
 *          description: Hubo un error interno
 */
router.get("/:idService", verifyToken, getService);


export default router;
