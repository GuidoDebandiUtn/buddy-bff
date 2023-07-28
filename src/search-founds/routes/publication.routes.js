import { Router } from "express";
import {
    getPublications
} from "../controllers/publication.controller.js";
const router = Router();
/**
 * @swagger
 * tags:
 *   name: PUBLICATION
 *   description: ABM publicaciones
 */

/**
 * @swagger
 * /parameters/publications/:
 *   get:
 *     summary: Obtiene una lista de publiaciones.
 *     tags: [PUBLICATION]
 *     params:
 *       - name: page
 *         description: numero de hoja a mostrar
 *         required: false
 *         default: 0
 *         schema:
 *           type: Integer
 *       - name: size
 *         description: tamaño de la hoja a mostrar, cantidad de elementos
 *         required: false
 *         default: 10
 *         schema:
 *           type:Integer
 *       - name: modelType
 *         description: tipo de publicacion a mostrar, puede ser PublicationAdoption o PublicationSearch
 *         required: false
 *         default: PublicationSearch
 *         schema:
 *           type:String
 *     responses:
 *       200:
 *         description: Lista de publicaciones obtenida.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: No existe el tipo de publicacion seleccionado.
 *       500:
 *          description: Error interno del servicio
 */
router.get('/',getPublications);

export default router;