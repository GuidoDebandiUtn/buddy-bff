import { Router } from "express";
import {
  getUsers,
  getUser,
  userUpdate,
  userDelete,
  changeState,
} from "../controllers/user.controller.js";
import { verifyToken } from "../controllers/auth.controller.js";

const router = Router();

router.get("/", verifyToken, getUsers);
router.get("/:idUser", verifyToken, getUser);
router.put("/:idUser", verifyToken, userUpdate);
router.delete("/:idUser", verifyToken, userDelete);
router.post("/changeState/:idUser/:userStateName", verifyToken, changeState);

export default router;
