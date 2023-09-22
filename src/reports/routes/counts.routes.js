import { Router } from "express";
import { getActiveAdoptions, getActiveLosts, getActiveServices, getActiveUsers, getSucessAdoptions, getSucessLosts } from "../controller/counts.controller.js";
const router = Router();

router.get('/founds-success',getSucessLosts);
router.get('/adoptions-success',getSucessAdoptions);
router.get('/losts-actives',getActiveLosts);
router.get('/users-actives',getActiveUsers);
router.get('/adoptions-actives',getActiveAdoptions);
router.get('/services-actives',getActiveServices);


export default router;