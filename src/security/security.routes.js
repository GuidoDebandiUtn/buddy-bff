import { Router } from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import userStateRoutes from "./routes/userState.routes.js";
import establishmentRoutes from "./routes/establishment.routes.js";
import roleRoutes from "./routes/role.routes.js";
import complaintRoutes from "./routes/complaint.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/userState", userStateRoutes);
router.use("/role", roleRoutes);
router.use("/establishment", establishmentRoutes);
router.use("/complaint", complaintRoutes);

export default router;
