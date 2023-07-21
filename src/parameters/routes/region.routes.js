import { Router } from "express";

const router = Router();

router.post("/");
router.get("/");
router.get("/:idRegion");
router.put("/:idRegion");
router.delete("/:idRegion");

export default router;
