import { Router } from "express";

const router = Router();

router.post("/");
router.get("/");
router.get("/:idPetBreed");
router.put("/:idPetBreed");
router.delete("/:idPetBreed");

export default router;
