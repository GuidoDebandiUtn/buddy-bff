import { Router } from "express";
import {    getPublications, postAdoption, postSearch,deletePublication} from "../controllers/publication.controller.js";
const router = Router();
/**
 * @swagger
 * tags:
 *   name: PUBLICATION
 *   description: ABM publicaciones
 */

/**
 * @swagger
 * /publications/publication:
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


/**
 * @swagger
 * /publications/publication/search:
 *   post:
 *     summary: Crea una nueva publicacion de busqueda.
 *     tags: [PUBLICATION]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idPublicationSearch:
 *                 type: uuid
 *               title:
 *                 type: string
 *               images:
 *                 type: text
 *               description:
 *                 type: string
 *               latitude:
 *                 type: double
 *               longitude:
 *                 type: double
 *               isFound:
 *                 type: boolean
 *               lostDate:
 *                 type: date
 *                 format: "dd:mm:aaaa"
 *     responses:
 *       201:
 *         description: Publicacion creada.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Error en los atributos de la publicacion.
 *       500:
 *          description: Error interno del servicio
 */
router.post('/search',postSearch);


/**
 * @swagger
 * /publications/publication/adoption:
 *   post:
 *     summary: Crea una nueva publicacion de adopcion.
 *     tags: [PUBLICATION]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idPublicationAdoption:
 *                 type: UUID
 *                 description: UUID de la publicacion, es creada durante la persistencia de la entidad en BD
 *               createdAt:
 *                 type: DATE
 *                 description: fecha de cracion de la entidad, es creada durante la persistencia de la entidad en BD
 *               title:
 *                 type: STRING
 *                 description: título de la publicacion, es pasada por atributo en el cuerpo de la peticion.
 *               images:
 *                 type: TEXT
 *                 description: imagenes de la publicacion, un arreglo de las cadenas de id de cada imagen en AWS
 *               description:
 *                 type: STRING
 *                 description: título de la publicacion, es pasada por atributo en el cuerpo de la petición.
 *               contactPhone:
 *                 type: INTEGER
 *                 description: numero de telefono de contacto de la publicacion, es pasada por atributo en el cuerpo de la petición.
 *               newOwnerName:
 *                 type: STRING
 *                 description: Nombre del nuevo dueño de la mascota, es nulo durante la creacion.
 *               newOwnerId:
 *                 type: UUID
 *                 description: UUID del nuevo dueño de la mascota, es nulo durante la creación.
 *               idPetColor:
 *                 type: UUID
 *                 description: UUID del color de la mascota, es pasada por atributo en el cuerpo de la petición.
 *               idPetBreed:
 *                 type: UUID
 *                 description: UUID de la raza de la mascota, es pasada por atributo en el cuerpo de la petición.
 *               idLocality:
 *                 type: UUID
 *                 description: UUID de la localidad de la mascota, es pasada por atributo en el cuerpo de la petición.
 *               idPublicationState:
 *                 type: UUID
 *                 description: UUID del estado de la publicacion, se asigna el estado "ACTIVO" a una nueva publicacion por default.
 *               idUser:
 *                 type: UUID
 *                 description: UUID del usuario creador de la publicacion, es tomado de la informacion del token de la peticion.
 *     responses:
 *       201:
 *         description: Adopcion creada correctamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Error en los atributos de la publicacion.
 *       500:
 *          description: Error interno del servicio
 */
router.post('/adoption',postAdoption);


router.delete('/:idPublication',deletePublication);

export default router;