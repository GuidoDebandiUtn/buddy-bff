import { Router } from "express";

import countRoutes from "./routes/counts.routes.js";

const router = Router();

router.use("/count", countRoutes);


export default router;