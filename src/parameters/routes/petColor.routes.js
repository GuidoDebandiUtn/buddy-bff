import { Router } from "express";

const router = Router();

router.post("/");
router.get("/");
router.get("/:idPetColor");
router.put("/:idPetColor");
router.delete("/:idPetColor");

export default router;
