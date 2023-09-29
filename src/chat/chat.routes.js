import { Router } from "express";

import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";

const router = Router();

router.use("/chat",chatRoutes);
router.use("/message",messageRoutes);


export default router;