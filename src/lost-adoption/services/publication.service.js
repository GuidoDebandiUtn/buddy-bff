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

  try {
    const pageNumber = parseInt(page, 10);
    const recordsPerPageNumber = parseInt(recordsPerPage, 10);
    let orderBy;
    let modelName;
    let include = [
      {model:PetColor, as:'color', attributes: ['petColorName']},
      {model:Locality, as:'locality', attributes: ['localityName']},
      {model:PetBreed, as:'breed',include: [{model:PetType, as:'type', attributes: ['petTypeName']}], attributes: ['petBreedName','size','intelligence','temperament','lifespan','idPetType','idPetBreed']},
      {model:PublicationState, as:'state', attributes: ['name','code']}
    ];
    let attributes = ['title','images','description'];

    if (modelType === 'adoption') {
      modelName=PublicationAdoption;
      orderBy='contactPhone';
      attributes.push('idPublicationAdoption','contactPhone','newOwnerName','newOwnerId');
      

    }else{
      modelName=PublicationSearch;
      attributes.push('latitude','longitude','isFound','lostDate');
      orderBy = 'lostDate';
      include.push({model:Trace, as: 'traces', attributes:['latitude','longitude','traceDate','traceTime','images']});
    }
    console.log("Calling getPaginatedData with: pageNumber: %s, recordsPerPageNumber: %s, orderBy; %s, include: %o",pageNumber, recordsPerPageNumber,orderBy,include);
    return  getPaginatedData(modelName, pageNumber, recordsPerPageNumber,orderBy,attributes,include);
  } catch (err) {
    console.error('Error fetching paginated data:', err);
    throw error;
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
    throw error;
  }
}

