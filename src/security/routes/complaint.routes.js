import { Router } from "express";
import { complaintDelete, getComplaintsAll, postComplaint } from "../controllers/complaint.controller.js";

const router = Router();

router.post("/",postComplaint);
router.delete("/:idComplaint",complaintDelete) 
router.get("/",getComplaintsAll) 

router.post("/execute/:idComplaint") 


export default router;