import { Router } from "express";
import securityRoutes from "./security/security.routes.js";

const router = Router();

router.use("/security", securityRoutes);

export default router;
