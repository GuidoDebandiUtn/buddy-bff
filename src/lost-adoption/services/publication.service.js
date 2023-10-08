import { Locality } from "../../models/Locality.js";
import { PetBreed } from "../../models/PetBreed.js";
import { PetColor } from "../../models/PetColor.js";
import { PetType } from "../../models/PetType.js";
import { PublicationAdoption } from "../../models/PublicationAdoption.js";
import { PublicationSearch } from "../../models/PublicationSearch.js";
import { PublicationState } from "../../models/PublicationState.js";
import { Trace } from "../../models/Trace.js";
import { getLocalityById } from "../../parameters/services/locality.service.js";
import { getPetBreedById } from "../../parameters/services/petBreed.service.js";
import { getPetColorById } from "../../parameters/services/petColor.service.js";
import { getPetTypeById } from "../../parameters/services/petType.service.js";
import { User } from "../../models/User.js";
import { CreateNotificationForZone } from "../../reports/service/notifications.services.js";

export async function retrivePaginatedPublications(  page = 1,  recordsPerPage = 10,  modelType = "SEARCH") {
  
  const modelParams = getModel(modelType);
  try {
    const limit = parseInt(recordsPerPage, 10);
    const offset = (parseInt(page, 10) - 1) * recordsPerPage;
    const order = [[modelParams.orderBy, 'DESC']];
    const attributes = modelParams.attributes;
    const include = modelParams.include;

    let publications =  modelParams.model.findAll({ offset, limit, order, attributes ,include})
    
    console.log("Se obtuvieron las publicaciones: %s",publications);
    return publications;
  } catch (err) {
    console.error("Error fetching paginated data:", err);
    throw err;
  }
}


export async function getPublicationsByUser(idUser) {
  let include = [
    {model: User,attributes:["userName","idUser"],},
    {model:PetColor, attributes: ['petColorName']},
    {model:Locality, attributes: ['localityName']},
    {model:PetBreed,include: [{model:PetType, attributes: ['petTypeName']}], attributes: ['petBreedName','size','intelligence','temperament','lifespan','idPetType','idPetBreed']},
    {model:PublicationState, attributes: ['name'],where: {name:'ACTIVO'}},
  ];
  try {
    const adoptions =await PublicationAdoption.findAll({where: {idUser: idUser}, include: include});
    console.log ("adopciones obtenidas correctamente");
    include.push({model:Trace, attributes:['latitude','longitude','traceDate','traceTime','images']});
    const searchs =await PublicationSearch.findAll({where: {idUser: idUser}, include: include});
    console.log ("busquedas obtenidas correctamente");

    
    return  {adoptions,searchs};
  } catch (err) {
    console.error('Error al obtener las publicaciones del usuario:', error);
    throw err;
  }
};


export async function createSearch(searchDto,idUser) {
  try {
    let locality = await getLocalityById(searchDto.idLocality);
    let breed = await getPetBreedById(searchDto.idPetBreed);
    let petType = await getPetTypeById(searchDto.idPetType);
    let color = await getPetColorById(searchDto.idPetColor);

    if (!locality || !petType || !color) {
      console.log("locality: %s,petType: %s,color: %s", locality, petType, color);
      throw new Error("Error en las relaciones de la mascota");
    }

    if(searchDto.idPetBreed && !breed){
      console.log("Pet Breed: %s", breed);
      throw new Error("Error en la raza enviada para la mascota");
    }

    const activePublicationState = await PublicationState.findOne({
      attributes: ["idPublicationState"],
      where: { name: "ACTIVO" },
    });

    console.log(`Calling PublicationSearch.create with: ${JSON.stringify(searchDto)}`);
    const newPublication = await PublicationSearch.create({
      idPublicationState: activePublicationState.idPublicationState,
      idUser: idUser,
      ...searchDto,
    });

    try{
    CreateNotificationForZone(searchDto.idLocality,`Se ha creado una busqueda de una mascota en tu zona, por favor si llegas a verla, da aviso!`);
    }catch(error){
      console.log("error creando notificacion para una nueva publicacion de busqueda: ",error)
    }


    return newPublication;
  } catch (error) {
    console.error("Error creating a publication:", error);
    throw error;
  }
}

export async function createAdoption(adoptionDto,idUser) {
  try {
    let locality = await getLocalityById(adoptionDto.idLocality);
    let breed = await getPetBreedById(adoptionDto.idPetBreed);
    let petType = await getPetTypeById(adoptionDto.idPetType);
    let color = await getPetColorById(adoptionDto.idPetColor);

    if (!locality || !petType || !color) {
      console.log("locality: %s,petType: %s,color: %s", locality, petType, color);
      throw new Error("Error en las relaciones de la mascota");
    }

    if(adoptionDto.idPetBreed && !breed){
      console.log("Pet Breed: %s", breed);
      throw new Error("Error en la raza enviada para la mascota");
    }

    const activePublicationState = await PublicationState.findOne({
      attributes: ["idPublicationState"],
      where: { name: "ACTIVO" },
    });

    const newPublication = await PublicationAdoption.create({
      idPublicationState: activePublicationState.idPublicationState,
      idUser:idUser,
      ...adoptionDto,
    });

    try{
      CreateNotificationForZone(adoptionDto.idLocality,`Se ha creado una adopcion en tu zona, ${adoptionDto.title}`);
    }catch(error){
      console.log("error creando notificacion para una nueva publicacion de adopcion: ",error)
    }

    return newPublication;
  } catch (error) {
    console.error("Error creating a publication:", error);
    throw error;
  }
}

export async function publicationDelete(idPublication, modelType) {
  const modelParams = getModel(modelType);
  const whereClause = {};
  whereClause[modelParams.attributes.pop()] = idPublication;

  let publication;

  const inactivePublicationState = await PublicationState.findOne({
    attributes: ["idPublicationState"],
    where: { name: "INACTIVO" },
  });
  console.log(
    `estado Inactivo obtenido correctamente. entidad obtenida: '${inactivePublicationState}'`
  );

  try {
    publication = await modelParams.model.update(
      {
        idPublicationState: inactivePublicationState.idPublicationState,
        updatedDate: new Date(),
      },
      { where: whereClause, returning: true }
    );

    console.log(
      `Se ha modificado correctamente la publicacion. Nueva entidad: '${publication}'`
    );

    return publication;
  } catch (error) {
    console.error("Error deleting the publication with id:", idPublication);
    console.error(error);
    throw error;
  }
}

export async function getPublicationById(idPublication, modelType = "SEARCH") {
  const modelParams = getModel(modelType);
  const whereClause = {};
  whereClause[modelParams.attributes.pop()] = idPublication;

  try {
    console.log(
      `Llamando a sequalize.findOne con: attributes='${modelParams.attributes}', include=${JSON.stringify(modelParams.include)}, where=${JSON.stringify(whereClause)}`
    );
    const publication = await modelParams.model.findOne({
      attributes: modelParams.attributes,
      include: modelParams.include,
      where: whereClause,
    });

    return publication;
  } catch (error) {
    console.log(
      "Ocurrio un error durante la consulta a BD de la publicacion con ID:",
      idPublication
    );
    console.log(error);
    throw error;
  }
}

export async function updatePublication(  publicationDto,  idPublication,  modelType) {
  const modelParams = getModel(modelType);
  let whereClause = {};
  whereClause[modelParams.attributes.pop()] = idPublication;

  let locality ;
  let breed ;
  let petType; 
  let color;

  if(publicationDto.idLocality) locality = await getLocalityById(publicationDto.idLocality);
  if(publicationDto.idPetBreed) breed = await getPetBreedById(publicationDto.idPetBreed);
  if(publicationDto.idPetType) petType = await getPetTypeById(publicationDto.idPetType);
  if(publicationDto.idPetColor) color = await getPetColorById(publicationDto.idPetColor);
 

  if (publicationDto.idLocality && !locality || publicationDto.idPetType  && !petType 
    ||publicationDto.idPetColor && !color || publicationDto.idPetBreed && !breed) {
    console.log("locality: %s,petType: %s,color: %s, breed: %s", locality, petType, color, breed);
    throw new Error("Error en las relaciones de la mascota");
  }

  console.log(`Llamando a update de '${JSON.stringify(modelType)}', where Clause: ${JSON.stringify(whereClause)}, con el dto: ${JSON.stringify(publicationDto)}`);

  try {
    let publicationNew = await modelParams.model.update(
      { ...publicationDto },
      { where: whereClause, returning: true }
    );

    return publicationNew;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Error durante la actualizacion de los datos de la publicacion. error: '${error}'.`
    );
  }
}

function getModel(modelType) {
  let orderBy;
  let model;
  let include = [
    {model: User,attributes:["userName","idUser"],},
    { model: PetColor, attributes: ["petColorName"] },
    { model: Locality, attributes: ["localityName"] },
    { model: PetBreed,
      include: [{ model: PetType, attributes: ["petTypeName"] }],
      attributes: ["petBreedName","size","intelligence","temperament","lifespan","idPetType","idPetBreed",],
    },
    {model: PublicationState,attributes: ["name"],where: { name: "ACTIVO" },},

  ];
  let attributes = ["title", "images", "description"];

  if (modelType.toUpperCase() == "ADOPTION") {
    model = PublicationAdoption;
    orderBy = "contactPhone";
    attributes.push(
      "contactPhone",
      "newOwnerName",
      "newOwnerId",
      "idPublicationAdoption"
    );
  } else if (modelType.toUpperCase() == "SEARCH") {
    model = PublicationSearch;
    attributes.push(
      "latitude",
      "longitude",
      "isFound",
      "lostDate",
      "idPublicationSearch"
    );
    orderBy = "lostDate";
    include.push({
      model: Trace,
      attributes: ["latitude", "longitude", "traceDate", "traceTime", "images"],
    });
  }

  console.log(
    `Parametros de modelo obtenidos: orderBy='${orderBy}', model= '${model}', attributes= '${attributes}', include= '${include}'`
  );
  return { orderBy, model, attributes, include };
}
