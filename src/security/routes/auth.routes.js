import { Router } from "express";
import {
  userRegistration,
  login,
  logout,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", userRegistration);
router.post("/login", login);
router.post("/logout", logout);

export default router;
