import { Router } from "express";
import serviceRoutes from "./routes/service.routes.js";

const router = Router();


router.use("/service", serviceRoutes);


export default router;