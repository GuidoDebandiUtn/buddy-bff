import { Router } from "express";
import { complaintDelete, getComplaintsAll, postComplaint } from "../controllers/complaint.controller.js";

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
router.post("/",postComplaint);

/**
 * @swagger
 * /security/complaint/:idComplaint:
 *  post:
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
router.delete("/:idComplaint",complaintDelete) 

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
router.get("/",getComplaintsAll) 

router.post("/execute/:idComplaint") 


export default router;