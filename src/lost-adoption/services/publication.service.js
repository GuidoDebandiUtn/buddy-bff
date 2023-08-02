import { PublicationAdoption } from "../../models/PublicationAdoption.js";
import { PublicationSearch } from "../../models/PublicationSearch.js";
import { getPaginatedData } from "../../utils/pagination.js";



export async function retrivePaginatedPublications(page = 1, recordsPerPage = 10, modelType = 'search') {

  try {
    const pageNumber = parseInt(page, 10);
    const recordsPerPageNumber = parseInt(recordsPerPage, 10);
    var modelName;

    if (modelType === 'adoption') {
      modelName = PublicationAdoption;
    }else{
      modelName = PublicationSearch;
    }

    return getPaginatedData(modelName, pageNumber, recordsPerPageNumber);

  } catch (err) {
    console.error('Error fetching paginated data:', err);
    throw error;
  }
};

export async function createSearch(searchDto) {
  try {
    const newPublication = await PublicationSearch.create(
      {
        createdAt: new Date(),
        ...searchDto
      },
      { fields: ["createdAt", "title", "images", "description", "latitude",
       "longitude","isFound", "lostDate",] }
    );

    return newPublication;
  } catch (error) {
    throw error;
  }
}

