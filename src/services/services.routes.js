import { Router } from "express";
import serviceRoutes from "./routes/service.routes.js";
import ratingRoutes from "./routes/rating.routes.js";
import serviceStateRoutes from "./routes/serviceState.routes.js";

const router = Router();

router.use("/service", serviceRoutes);
router.use("/rating", ratingRoutes);
router.use("/serviceState", serviceStateRoutes);

export default router;
