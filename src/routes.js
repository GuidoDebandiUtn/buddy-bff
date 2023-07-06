import { Router } from "express";
import securityRoutes from "./security/security.routes.js";

const router = Router();

router.use("/api/security", securityRoutes);

export default router;
