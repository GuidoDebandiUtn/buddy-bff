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





export async function retrivePaginatedPublications(page = 1, recordsPerPage = 10, modelType = 'search') {

  const modelParams = getModel(modelType);
  try {
    const pageNumber = parseInt(page, 10);
    const recordsPerPageNumber = parseInt(recordsPerPage, 10);
    console.log("Calling getPaginatedData with: pageNumber: %s, recordsPerPageNumber: %s, orderBy; %s, include: %o",pageNumber, recordsPerPageNumber,modelParams.orderBy,modelParams.include);
    return  getPaginatedData(modelParams.model, pageNumber, recordsPerPageNumber,modelParams.orderBy,modelParams.attributes,modelParams.include);
  } catch (err) {
    console.error('Error fetching paginated data:', err);
    throw err;
  }
};

export async function createSearch(searchDto) {
  try {
    let locality = await getLocalityById(searchDto.idLocality);
    let breed = await getPetBreedById(searchDto.idPetBreed);
    let color = await getPetColorById(searchDto.idPetColor);

    if(!locality || !breed || !color){
      console.log("locality: %s,breed: %s,color: %s",locality,breed,color)
      throw new Error('Error on the filters values!');
    }

    const activePublicationState = await PublicationState.findOne({
      attributes: ["idPublicationState"],
      where: { name: 'ACTIVO' }
    });

    const newPublication = await PublicationSearch.create(
      {
        createdAt: new Date(),
        idPublicationState: activePublicationState.idPublicationState,
        //TODO idUser: token.getUserInfo........,
        ...searchDto
      },
    );

    return newPublication;
  } catch (error) {
    console.error('Error creating a publication:', error);
    throw error;
  }
}


export async function createAdoption(adoptionDto) {
  try {
    let locality = await getLocalityById(adoptionDto.idLocality);
    let breed = await getPetBreedById(adoptionDto.idPetBreed);
    let color = await getPetColorById(adoptionDto.idPetColor);

    if(!locality || !breed || !color){
      console.log("locality: %s,breed: %s,color: %s",locality,breed,color)
      throw new Error('Error on the filters values!');
    }

    const activePublicationState = await PublicationState.findOne({
      attributes: ["idPublicationState"],
      where: { name: 'ACTIVO' }
    });

    const newPublication = await PublicationAdoption.create(
      {
        createdAt: new Date(),
        idPublicationState: activePublicationState.idPublicationState,
        //TODO idUser: token.getUserInfo........,
        ...adoptionDto
      },
    );

    return newPublication;
  } catch (error) {
    console.error('Error creating a publication:', error);
    throw error;
  }
}


export async function publicationDelete(idPublication,modelType) {
  const modelParams= getModel(modelType);
  const whereClause = {};
  whereClause[modelParams.attributes.pop()] = idPublication;

  const inactivePublicationState = await PublicationState.findOne({
    attributes: ["idPublicationState"],
    where: { name: 'INACTIVO' }
  });
  try {
    await modelParams.model.update(
      { idPublicationState: inactivePublicationState.idPublicationState },
      { where: whereClause, returning: true }
    );

    return;
  } catch (error) {
    console.error('Error deleting the publication with id:', idPublication);
    throw error;
  }
}


export async function getPublicationById(idPublication,modelType) {
  const modelParams = getModel(modelType);
  const whereClause = {};
  whereClause[modelParams.attributes.pop()] = idPublication;

  try {
    const publication = await modelParams.model.findOne({
      attributes: modelParams.attributes,
      include: modelParams.include,
      where: whereClause
    });

    return publication;
  } catch (error) {
    console.error("Ocurrio un error durante la consulta a BD de la publicacion con ID:",idPublication);
    console.error(error);
    throw error;
  }
}


function getModel(modelType){
  let orderBy;
  let model;
  let include = [
    {model:PetColor, as:'color', attributes: ['petColorName']},
    {model:Locality, as:'locality', attributes: ['localityName']},
    {model:PetBreed, as:'breed',include: [{model:PetType, as:'type', attributes: ['petTypeName']}], attributes: ['petBreedName','size','intelligence','temperament','lifespan','idPetType','idPetBreed']},
    {model:PublicationState, as:'state', attributes: ['name','code'],where: {name:'ACTIVO'}}
  ];
  let attributes = ['title','images','description'];

  if (modelType === 'adoption') {
    model=PublicationAdoption;
    orderBy='contactPhone';
    attributes.push('contactPhone','newOwnerName','newOwnerId','idPublicationAdoption');
    

  }else{
    model=PublicationSearch;
    attributes.push('latitude','longitude','isFound','lostDate','idPublicationSearch');
    orderBy = 'lostDate';
    include.push({model:Trace, as: 'traces', attributes:['latitude','longitude','traceDate','traceTime','images']});
  }

  return {orderBy,model,attributes,include}
}