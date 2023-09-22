import { Router } from "express";
import { verifyToken } from "../../security/controllers/auth.controller.js";
import { deleteTrace, getTracesByPublication, postTrace, putTrace } from "../controllers/trace.controller.js";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: TRACE
 *   description: ABM trazas
 */


/**
 * @swagger
 * publications/trace/:idPublicationSearch:
 *   get:
 *     summary: Obtiene todas las trazas de un publicacion puntual.
 *     tags: [TRACE]
 *     parameters:
 *       - in: query
 *         name: idPublicationSearch
 *         description: id de la publicacion dueña de las trazas
 *         required: true
 *         default: null
 *         schema:
 *           type:String
 *     responses:
 *       200:
 *         description: Lista de trazas obtenida.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: No se ha recibido informacion de la publicacion.
 *       404:
 *         description: No se ha encontrado la publicacion solicitada.
 *       204:
 *         description: No se ha trazas para la publicacion solicitada.
 *       500:
 *          description: Error interno del servicio
 */
router.get('/:idPublicationSearch', verifyToken,getTracesByPublication);

/**
 * @swagger
 * publications/trace/:
 *   post:
 *     summary: Crea una nueva traza de la busqueda.
 *     tags: [TRACE] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idPublicationSearch:
 *                 type: string
 *               traceDate:
 *                 type: date
 *                 description: Fecha en la que se vio al animal en la traza definida por el usuario
 *                 format: "dd:mm:aaaa"
 *               traceTime:
 *                 type: time
 *                 description: Horario en la que se vio al animal en la traza definida por el usuario
 *                 format: "Hh:mm"
 *               latitude:
 *                 type: double
 *               longitude:
 *                 type: double
 *               images:
 *                 type: TEXT
 *                 description: imagenes de la traza, un arreglo de las cadenas de id de cada imagen en AWS
 *                 required: false
 *               localityName:
 *                 type: String
 *                 description: nombre de la localidad donde fue avistada la mascota.
 *                 required: false
 *     responses:
 *       201:
 *         description: Traza creada correctamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Error en los atributos de la traza.
 *       500:
 *          description: Error interno del servicio
 */
router.post('/', verifyToken,postTrace);

/**
 * @swagger
 * publications/trace/:idTrace:
 *   put:
 *     summary: Modifica una traza.
 *     parameters:
 *       - in: query
 *         name: idTrace
 *         schema:
 *           type: uuid
 *         description: Id de la traza a modificar.
 *     tags: [TRACE]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               traceDate:
 *                 type: date
 *                 description: Fecha en la que se vio al animal en la traza definida por el usuario
 *                 format: "dd:mm:aaaa"
 *               traceTime:
 *                 type: time
 *                 description: Horario en la que se vio al animal en la traza definida por el usuario
 *                 format: "Hh:mm"
 *               latitude:
 *                 type: double
 *               longitude:
 *                 type: double
 *               images:
 *                 type: TEXT
 *                 description: imagenes de la traza, un arreglo de las cadenas de id de cada imagen en AWS
 *                 required: false
 *               localityName:
 *                 type: String
 *                 description: nombre de la localidad donde fue avistada la mascota.
 *                 required: false
 *     responses:
 *       200:
 *         description: Traza modificada correctamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Error en los atributos de la traza.
 *       500:
 *          description: Error interno del servicio
 */
router.put('/:idTrace', verifyToken,putTrace);

/**
 * @swagger
 * publications/trace/:idTrace:
 *   delete:
 *     summary: Elimina una traza indicando el Id, se realiza una baja logica de la traza antes creada.
 *     parameters:
 *       - in: query
 *         name: idTrace
 *         schema:
 *           type: uuid
 *         description: Id de la traza a eliminar.
 *     tags: [TRACE]
 *     responses:
 *       200:
 *         description: Traza eliminada correctamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Error en el id de la traza.
 *       500:
 *          description: Error interno del servicio
 */
router.delete('/:idTrace', verifyToken,deleteTrace);


export default router;