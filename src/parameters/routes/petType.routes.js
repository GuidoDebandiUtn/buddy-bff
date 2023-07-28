import { Router } from "express";
import {
  getPetType,
  getPetTypes,
  petTypeCreate,
  petTypeDelete,
  petTypeUpdate,
} from "../controllers/petType.controller.js";

const router = Router();

router.post("/", petTypeCreate);
router.get("/", getPetTypes);
router.get("/:idPetType", getPetType);
router.put("/:idPetType", petTypeUpdate);
router.delete("/:idPetType", petTypeDelete);

export default router;
