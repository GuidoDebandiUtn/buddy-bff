import { Router } from "express";
import {
  userRegistration,
  login,
  logout,
  validateUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", userRegistration);
router.post("/login", login);
router.post("/logout", logout);
router.get("/validateAccount/:idUser", validateUser);

export default router;
