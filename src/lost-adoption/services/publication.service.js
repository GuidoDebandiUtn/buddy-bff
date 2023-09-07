import { Locality } from "../../models/Locality.js";
import { PetBreed } from "../../models/PetBreed.js";
import { PetColor } from "../../models/PetColor.js";
import { PetType } from "../../models/PetType.js";
import { PublicationAdoption } from "../../models/PublicationAdoption.js";
import { PublicationSearch } from "../../models/PublicationSearch.js";
import { PublicationState } from "../../models/PublicationState.js";
import { getPaginatedData } from "../../utils/pagination.js";
import { Trace } from "../../models/Trace.js";
import { getLocalityById } from "../../parameters/services/locality.service.js";
import { getPetBreedById } from "../../parameters/services/petBreed.service.js";
import { getPetColorById } from "../../parameters/services/petColor.service.js";

export async function retrivePaginatedPublications(
  page = 1,
  recordsPerPage = 10,
  modelType = "search"
) {
  const modelParams = getModel(modelType);
  try {
    const pageNumber = parseInt(page, 10);
    const recordsPerPageNumber = parseInt(recordsPerPage, 10);
    console.log(
      "Calling getPaginatedData with: pageNumber: %s, recordsPerPageNumber: %s, orderBy; %s, include: %o",
      pageNumber,
      recordsPerPageNumber,
      modelParams.orderBy,
      modelParams.include
    );
    return getPaginatedData(
      modelParams.model,
      pageNumber,
      recordsPerPageNumber,
      modelParams.orderBy,
      modelParams.attributes,
      modelParams.include
    );
  } catch (err) {
    console.error("Error fetching paginated data:", err);
    throw err;
  }
}


export async function getPublicationsByUser(idUser) {
  let include = [
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




export async function createSearch(searchDto) {
  try {
    let locality = await getLocalityById(searchDto.idLocality);
    let breed = await getPetBreedById(searchDto.idPetBreed);
    let color = await getPetColorById(searchDto.idPetColor);

    if (!locality || !breed || !color) {
      console.log("locality: %s,breed: %s,color: %s", locality, breed, color);
      throw new Error("Error on the filters values!");
    }

    const activePublicationState = await PublicationState.findOne({
      attributes: ["idPublicationState"],
      where: { name: "ACTIVO" },
    });

    const newPublication = await PublicationSearch.create({
      idPublicationState: activePublicationState.idPublicationState,
      //TODO idUser: token.getUserInfo........,
      ...searchDto,
    });

    return newPublication;
  } catch (error) {
    console.error("Error creating a publication:", error);
    throw error;
  }
}

export async function createAdoption(adoptionDto) {
  try {
    let locality = await getLocalityById(adoptionDto.idLocality);
    let breed = await getPetBreedById(adoptionDto.idPetBreed);
    let color = await getPetColorById(adoptionDto.idPetColor);

    if (!locality || !breed || !color) {
      console.log("locality: %s,breed: %s,color: %s", locality, breed, color);
      throw new Error("Error on the filters values!");
    }

    const activePublicationState = await PublicationState.findOne({
      attributes: ["idPublicationState"],
      where: { name: "ACTIVO" },
    });

    const newPublication = await PublicationAdoption.create({
      idPublicationState: activePublicationState.idPublicationState,
      //TODO idUser: token.getUserInfo........,
      ...adoptionDto,
    });

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

export async function getPublicationById(idPublication, modelType) {
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

  console.log(`Llamando a update de '${modelType}', where Clause: ${whereClause}, con el dto: ${publicationDto}`);
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
    { model: PetColor, attributes: ["petColorName"] },
    { model: Locality, attributes: ["localityName"] },
    {
      model: PetBreed,
      include: [{ model: PetType, attributes: ["petTypeName"] }],
      attributes: [
        "petBreedName",
        "size",
        "intelligence",
        "temperament",
        "lifespan",
        "idPetType",
        "idPetBreed",
      ],
    },
    {
      model: PublicationState,
      attributes: ["name"],
      where: { name: "ACTIVO" },
    },
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
