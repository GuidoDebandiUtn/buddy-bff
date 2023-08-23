import { Router } from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import userStateRoutes from "./routes/userState.routes.js";
import establishmentRoutes from "./routes/establishment.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/userState", userStateRoutes);
router.use("/establishment", establishmentRoutes);

export default router;
