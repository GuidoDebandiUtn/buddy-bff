import { Router } from "express";
import { complaintDelete, complaintExecute, getComplaintsAll, postComplaint } from "../controllers/complaint.controller.js";
import { verifyToken } from "../controllers/auth.controller.js";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: COMPLAINT
 *   description: Endpoints relacionados con la creacion, modificacion y eliminacion de denuncias
 */


/**
 * @swagger
 * /security/complaint/:
 *  post:
 *     summary: Crear una Denuncia.
 *     tags: [COMPLAINT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: Tipo de objeto del que se eleva la denuncia, puede ser SEARCH,ADOPTION o SERVICE
 *               reportDescription:
 *                 type: string
 *                 description: Descripcion de la denuncia elevada por el usuario.
 *               idUserReported:
 *                 type: string
 *                 description: Id del usuario dueño del objeto originario de la denuncia.
 *               idReference:
 *                 type: string
 *                 description: Id del objeto que se esta denunciando.
 *     responses:
 *       200:
 *         description: Denuncia creada correctamente
 *       400:
 *         description: Error en los parametros pasados.
 *       500:
 *          description: Error interno en la aplicacion
 */
router.post("/",verifyToken,postComplaint);

/**
 * @swagger
 * /security/complaint/:idComplaint:
 *  delete:
 *     tags: [COMPLAINT]
 *     summary: Eliminar una Denuncia
 *     parameters:
 *       - in: query
 *         name: idComplaint
 *         schema:
 *           type: uuid
 *         description: Id de la denuncia a eliminar.
 *     
 *     
 *     responses:
 *       200:
 *         description: Denuncia eliminada correctamente
 *       400:
 *         description: Error en el id pasado.
 *       500:
 *          description: Error interno en la aplicacion
 */
router.delete("/:idComplaint",verifyToken,complaintDelete) 

/**
 * @swagger
 * /security/complaint/:
 *   get:
 *     summary: Obtiene una lista de denuncias.
 *     tags: [COMPLAINT]
 *     parameters:
 *       - in: path
 *         name: page
 *         description: numero de hoja a mostrar
 *         required: false
 *         default: 0
 *         schema:
 *           type: Integer
 *       - in: path
 *         name: size
 *         description: tamaño de la hoja a mostrar, cantidad de elementos
 *         required: false
 *         default: 10
 *         schema:
 *           type:Integer
 *     responses:
 *       200:
 *         description: Lista de denuncias obtenida correctamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       204:
 *         description: No existe el ninguna denuncia para mostrar.
 *       500:
 *          description: Error interno del servicio
 */
router.get("/",verifyToken,getComplaintsAll) 

/**
 * @swagger
 * /security/complaint/execute/:validate/:idComplaint:
 *  post:
 *     tags: [COMPLAINT]
 *     summary: Ejecutar una denuncia, eliminando la publicacion y bloqueando al usuario o solo eliminando la denuncia en caso de que no se valide
 *     parameters:
 *       - in: query
 *         name: idComplaint
 *         schema:
 *           type: uuid
 *         description: Id de la denuncia a eliminar.
 *       - in: query
 *         name: validate
 *         schema:
 *           type: boolean
 *         description: Bandera para saber si la denuncia fue aprobada o rechazada
 *     
 *     
 *     responses:
 *       200:
 *         description: denuncia ejecutada correctamente
 *       400:
 *         description: Error en el id pasado.
 *       500:
 *          description: Error interno en la aplicacion
 */
router.post("/execute/:validate/:idComplaint",verifyToken,complaintExecute);


export default router;