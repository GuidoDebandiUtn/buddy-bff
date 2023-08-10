import { Router } from "express";
import securityRoutes from "./security/security.routes.js";
import parameterRoutes from "./parameters/parameters.routes.js";
import mypetRoutes from "./mypet/myPet.routes.js";

const router = Router();

router.use("/security", securityRoutes);
router.use("/parameters", parameterRoutes);
router.use("/mypet", mypetRoutes);

export default router;
