import { Router } from "express";
import {    getPublications, postAdoption, postSearch,deletePublication, putPublication, obtainPublicationsByUser, postSolvePublication} from "../controllers/publication.controller.js";
import { verifyToken } from "../../security/controllers/auth.controller.js";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: PUBLICATION
 *   description: ABM publicaciones
 */

/**
 * @swagger
 * /publications/publication/:
 *   get:
 *     summary: Obtiene una lista de publiaciones.
 *     tags: [PUBLICATION]
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
 *       - in: path
 *         name: modelType
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
 *       403:
 *         description: no se cuentan con los permissions necesarios para esta accion
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       500:
 *          description: Error interno del servicio
 */
router.get('/',verifyToken,getPublications);

/**
 * @swagger
 * /publications/publication/ByUser:
 *   get:
 *     summary: Obtiene una lista de publiaciones para un usuario.
 *     tags: [PUBLICATION]
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
 *       - in: path
 *         name: modelType
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
 *       403:
 *         description: no se cuentan con los permissions necesarios para esta accion
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       500:
 *          description: Error interno del servicio
 */
router.get('/ByUser',verifyToken,obtainPublicationsByUser);

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
 *       403:
 *         description: no se cuentan con los permissions necesarios para esta accion
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       500:
 *          description: Error interno del servicio
 */
router.post('/search', verifyToken,postSearch);

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
 *               idPublicationSearch:
 *                 type: uuid
 *               createdAt:
 *                 type: DATE
 *                 description: fecha de cracion de la entidad, es creada durante la persistencia de la entidad en BD
 *               sterilized:
 *                 type: BOOLEAN
 *                 description: bandera que indica si el animal esta castrado o no.
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
 *       403:
 *         description: no se cuentan con los permissions necesarios para esta accion
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       500:
 *          description: Error interno del servicio
 */
router.post('/adoption', verifyToken,postAdoption);

/**
 * @swagger
 * /publications/publication/:idPublication:
 *   delete:
 *     summary: Elimina una publicacion indicando el Id, la publicacion quedara asociada a un estado INACTIVO
 *     parameters:
 *       - in: path
 *         name: modelType
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo de publicacion, puede ser Search o Adoption.
 *       - in: query
 *         name: idPublication
 *         schema:
 *           type: uuid
 *         description: Id de la publicacion a eliminar.
 *     tags: [PUBLICATION]
 *     responses:
 *       200:
 *         description: Publicacion eliminada correctamente.
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
router.delete('/:idPublication',verifyToken,deletePublication);

/**
 * @swagger
 * /publications/publication/:idPublication:
 *   put:
 *     summary: Modifica una publicacion, el requestBody dependerá del tipo de publicacion solicitada.
 *     parameters:
 *       - in: path
 *         name: modelType
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo de publicacion, puede ser Search o Adoption.
 *       - in: query
 *         name: idPublication
 *         schema:
 *           type: uuid
 *         description: Id de la publicacion a eliminar.
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
 *               latitude:
 *                 type: double
 *                 description: UUID del usuario creador de la publicacion, es tomado de la informacion del token de la peticion.
 *               longitude:
 *                 type: double
 *               isFound:
 *                 type: boolean
 *               lostDate:
 *                 type: date
 *                 format: "dd:mm:aaaa"
 *     responses:
 *       200:
 *         description: Publicacion modificada correctamente.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       400:
 *         description: Error en los atributos de la publicacion.
 *       403:
 *         description: no se cuentan con los permissions necesarios para esta accion
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       500:
 *          description: Error interno del servicio
 */
router.put('/:idPublication',verifyToken,putPublication);

/**
 * @swagger
 * /publications/publication/solve/:idPublication:
 *   post:
 *     summary: Modifica el estado de una publicacion para que sea resuelto.
 *     parameters:
 *       - in: path
 *         name: modelType
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo de publicacion, puede ser Search o Adoption.
 *       - in: query
 *         name: idPublication
 *         schema:
 *           type: uuid
 *         description: Id de la publicacion a modificar.
 *     tags: [PUBLICATION]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       200:
 *         description: Publicacion resuelta correctamente.
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
router.post('/solve/:idPublication',verifyToken, postSolvePublication);

export default router;