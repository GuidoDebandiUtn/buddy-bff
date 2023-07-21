import { Router } from "express";
import {
  countryCreate,
  countryDelete,
  countryUpdate,
  getCountries,
  getCountry,
} from "../controllers/country.controller.js";

const router = Router();

router.post("/", countryCreate);
router.get("/", getCountries);
router.get("/:idCountry", getCountry);
router.put("/:idCountry", countryUpdate);
router.delete("/:idCountry", countryDelete);

export default router;
