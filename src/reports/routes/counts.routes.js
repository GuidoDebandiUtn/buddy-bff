import { Router } from "express";
import { getActiveAdoptions, getActiveLosts, getActiveServices, getActiveUsers, getSucessAdoptions, getSucessLosts } from "../controller/counts.controller.js";
import { verifyToken } from "../../security/controllers/auth.controller.js";
const router = Router();

router.get('/founds-success',verifyToken, getSucessLosts);
router.get('/adoptions-success',verifyToken,getSucessAdoptions);
router.get('/losts-actives',verifyToken,getActiveLosts);
router.get('/users-actives',verifyToken,getActiveUsers);
router.get('/adoptions-actives',verifyToken,getActiveAdoptions);
router.get('/services-actives',verifyToken,getActiveServices);


export default router;