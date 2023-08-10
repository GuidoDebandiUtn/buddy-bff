import { Router } from "express";
import {
  getPet,
  getPets,
  petCreate,
  petDelete,
  petUpdate,
} from "../controllers/pet.controller.js";

const router = Router();

router.post("/:idUser", petCreate);

router.get("/:idUser", getPets);

router.get("/:idUser/:idPet", getPet);

router.put("/:idUser/:idPet", petUpdate);

router.delete("/:idUser/:idPet", petDelete);

export default router;
