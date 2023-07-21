import { Router } from "express";

const router = Router();

router.post("/");
router.get("/");
router.get("/:idServiceType");
router.put("/:idServiceType");
router.delete("/:idServiceType");

export default router;
