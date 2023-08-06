

export async function getPaginatedData(model, pageNumber, recordsPerPage,orderBy,attributes,include) {
  const offset = (pageNumber - 1) * recordsPerPage;
  const limit = recordsPerPage;
  const order = [[orderBy, 'ASC']];

  return  model.findAll({ offset, limit, order,attributes ,include}) ;
}
