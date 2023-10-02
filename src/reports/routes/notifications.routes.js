import { Router } from "express";
import { verifyToken } from "../../security/controllers/auth.controller.js";
import { getNotificationsByUser } from "../controller/notifications.controller.js";

const router = Router();


router.get("/",verifyToken,getNotificationsByUser);

export default router;