

export async function getPaginatedData(model, pageNumber, recordsPerPage) {
  const offset = (pageNumber - 1) * recordsPerPage;
  const limit = recordsPerPage;

  const data = await model.findAll({ offset, limit });

  return { data };
}
