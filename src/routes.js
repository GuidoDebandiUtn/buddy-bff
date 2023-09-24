import { Router } from "express";
import securityRoutes from "./security/security.routes.js";
import parameterRoutes from "./parameters/parameters.routes.js";
import publicationRoutes from "./lost-adoption/lostAdoption.routes.js";
import mypetRoutes from "./mypet/myPet.routes.js";
import reportsRoutes from "./reports/reports.routes.js";
import servicesRoutes from "./services/services.routes.js";

const router = Router();

router.use("/security", securityRoutes);
router.use("/parameters", parameterRoutes);
router.use("/publications", publicationRoutes);
router.use("/mypet", mypetRoutes);
router.use("/reports", reportsRoutes);
router.use("/services", servicesRoutes);

export default router;
