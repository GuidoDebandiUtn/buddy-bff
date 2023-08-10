import { Router } from "express";
import {
  getInformation,
  getInformations,
  informationCreate,
  informationDelete,
  informationUpdate,
} from "../controllers/information.controller.js";

const router = Router();

router.post("/:idPet", informationCreate);

router.get("/:idPet", getInformations);

router.get("/:idPet/:idInformation", getInformation);

router.put("/:idPet/:idInformation", informationUpdate);

router.delete("/:idPet/:idInformation", informationDelete);

export default router;
