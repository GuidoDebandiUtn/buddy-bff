import { Router } from "express";
import {
  getPetBreed,
  getPetBreeds,
  petBreedCreate,
  petBreedDelete,
  petBreedUpdate,
} from "../controllers/petBreed.controller.js";

const router = Router();

router.post("/", petBreedCreate);
router.get("/", getPetBreeds);
router.get("/:idPetBreed", getPetBreed);
router.put("/:idPetBreed", petBreedUpdate);
router.delete("/:idPetBreed", petBreedDelete);

export default router;
