import { Router } from "express";

import countRoutes from "./routes/counts.routes.js";
import notificationsRoutes from "./routes/notifications.routes.js";

const router = Router();

router.use("/count", countRoutes);
router.use("/notification", notificationsRoutes);


export default router;