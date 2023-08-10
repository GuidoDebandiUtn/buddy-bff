import { Router } from "express";
import {
  getVaccine,
  getVaccines,
  vaccineCreate,
  vaccineDelete,
  vaccineUpdate,
} from "../controllers/vaccine.controller.js";

const router = Router();

router.post("/:idPet", vaccineCreate);

router.get("/:idPet", getVaccines);

router.get("/:idPet/:idVaccine", getVaccine);

router.put("/:idPet/:idVaccine", vaccineUpdate);

router.delete("/:idPet/:idVaccine", vaccineDelete);

export default router;
