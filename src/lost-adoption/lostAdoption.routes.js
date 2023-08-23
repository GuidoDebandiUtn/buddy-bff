import { Router } from "express";

import publicationRoutes from "./routes/publication.routes.js";

const router = Router();

router.use("/publication", publicationRoutes)


export default router;
