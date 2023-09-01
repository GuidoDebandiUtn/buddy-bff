


export async function get(req, res) {
    const {  modelType ,page, size,} = req.query;

  try {
    const data = await retrivePaginatedPublications(page,size, modelType);

    if (!data) {
      return res
        .status(404)
        .json({ message: "Error retriving publications" });
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

}


router.get('reports/founds-success',);
router.get('reports/adoptions-success',);
router.get('reports/losts-actives',);
router.get('reports/users-actives',);
router.get('reports/adoptions-actives',);
router.get('reports/services-actives',);