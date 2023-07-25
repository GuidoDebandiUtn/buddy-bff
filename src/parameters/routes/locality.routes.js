import { Router } from "express";
import {
  getLocalities,
  getLocality,
  localityCreate,
  localityDelete,
  localityUpdate,
} from "../controllers/locality.controller.js";

const router = Router();

router.post("/", localityCreate);
router.get("/", getLocalities);
router.get("/:idLocality", getLocality);
router.put("/:idLocality", localityUpdate);
router.delete("/:idLocality", localityDelete);

export default router;
