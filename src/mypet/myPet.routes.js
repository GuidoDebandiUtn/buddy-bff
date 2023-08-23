import { Router } from "express";
import petRoutes from "./routes/pet.routes.js";
import informationRoutes from "./routes/information.routes.js";
import turnRoutes from "./routes/turn.routes.js";
import vaccineRoutes from "./routes/vaccine.routes.js";

const router = Router();

router.use("/pet", petRoutes);
router.use("/information", informationRoutes);
router.use("/turn", turnRoutes);
router.use("/vaccine", vaccineRoutes);

export default router;
