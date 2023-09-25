import { Router } from "express";
import serviceRoutes from "./routes/service.routes.js";
import ratingRoutes from "./routes/service.routes.js";

const router = Router();


router.use("/service", serviceRoutes);
router.use("/rating", ratingRoutes);


export default router;