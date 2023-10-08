import { verifyToken } from "../../security/controllers/auth.controller.js";
import { Router } from "express";
import { changeStateService } from "../services/stateService.service.js";
import { changeServiceState } from "../controllers/serviceSate.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: SERVICESTATE
 *   description: Funcionalidades del estado en los servicios.
 */

/**
 * @swagger
 * /services/state/changeState/:idService/:serviceStateName:
 *  post:
 *     summary: Cambiar estado de un servicio.
 *     parameters:
 *       - in: query
 *         name: idService
 *         schema:
 *           type: uuid
 *         description: uuid del servicio que se quiere cambiar de estado.
 *       - in: query
 *         name: serviceStateName
 *         schema:
 *           type: string
 *         description: Nombre del estado al que se quiere cambiar.
 *     tags: [SERVICESTATE]
 *     responses:
 *      200:
 *        description: Se ha cambiado de estado un servicio exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      404:
 *        description: No se encuentra el servicio al que se le va a cambiar el estado o el estado al que se quiere cambiar
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      401:
 *        description: Error en el token enviado, no se disponen de permisos para realizar el cambio
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
router.post("/changeState/:idService/:serviceStateName", verifyToken, changeServiceState);

export default router;
