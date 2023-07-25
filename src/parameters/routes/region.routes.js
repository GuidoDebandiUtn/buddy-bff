import { Router } from "express";
import {
  getRegion,
  getRegions,
  regionCreate,
  regionDelete,
  regionUpdate,
} from "../controllers/region.controller.js";

const router = Router();

router.post("/", regionCreate);
router.get("/", getRegions);
router.get("/:idRegion", getRegion);
router.put("/:idRegion", regionUpdate);
router.delete("/:idRegion", regionDelete);

export default router;
