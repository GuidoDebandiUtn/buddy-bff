import { Router } from "express";
import securityRoutes from "./security/security.routes.js";
import parameterRoutes from "./parameters/parameters.routes.js";

const router = Router();

router.use("/security", securityRoutes);
router.use("/parameters", parameterRoutes);

export default router;
