import { Router } from "express";
import securityRoutes from "./security/security.routes.js";
import parameterRoutes from "./parameters/parameters.routes.js";
import publicationRoutes from "./search-founds/searchFound.routes.js";

const router = Router();

router.use("/security", securityRoutes);
router.use("/parameters", parameterRoutes);
router.use("/publication", publicationRoutes);

export default router;
