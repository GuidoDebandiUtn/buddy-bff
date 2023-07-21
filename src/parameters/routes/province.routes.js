import { Router } from "express";
import {
  getProvince,
  getProvinces,
  provinceCreate,
  provinceDelete,
  provinceUpdate,
} from "../controllers/province.controller.js";

const router = Router();

router.post("/", provinceCreate);
router.get("/", getProvinces);
router.get("/:idProvince", getProvince);
router.put("/:idProvince", provinceUpdate);
router.delete("/:idProvince", provinceDelete);

export default router;
