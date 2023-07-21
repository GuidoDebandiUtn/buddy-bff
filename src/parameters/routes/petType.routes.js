import { Router } from "express";

const router = Router();

router.post("/");
router.get("/");
router.get("/:idPetType");
router.put("/:idPetType");
router.delete("/:idPetType");

export default router;
