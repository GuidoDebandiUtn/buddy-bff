import { Router } from "express";
import {
  getUserState,
  getUserStates,
  userStateCreate,
  userStateDelete,
  userStateUpdate,
} from "../controllers/userState.controller.js";
import { verifyToken } from "../controllers/auth.controller.js";

const router = Router();

router.post("/", verifyToken, userStateCreate);
router.get("/", verifyToken, getUserStates);
router.get("/:idUserState", verifyToken, getUserState);
router.put("/:idUserState", verifyToken, userStateUpdate);
router.delete("/:idUserState", verifyToken, userStateDelete);

export default router;
