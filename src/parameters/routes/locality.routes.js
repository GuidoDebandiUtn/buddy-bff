import { Router } from "express";

const router = Router();

router.post("/");
router.get("/");
router.get("/:idLocality");
router.put("/:idLocality");
router.delete("/:idLocality");

export default router;
