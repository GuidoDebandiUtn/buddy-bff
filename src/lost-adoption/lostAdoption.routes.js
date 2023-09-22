import { Router } from "express";

import publicationRoutes from "./routes/publication.routes.js";
import traceRoutes from "./routes/trace.routes.js";
const router = Router();

router.use("/publication", publicationRoutes)
router.use("/trace", traceRoutes)

export default router;
