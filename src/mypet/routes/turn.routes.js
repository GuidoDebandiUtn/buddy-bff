import { Router } from "express";
import {
  getTurn,
  getTurns,
  turnCreate,
  turnDelete,
  turnUpdate,
} from "../controllers/turn.controller.js";

const router = Router();

router.post("/:idPet", turnCreate);

router.get("/:idPet", getTurns);

router.get("/:idPet/:idTurn", getTurn);

router.put("/:idPet/:idTurn", turnUpdate);

router.delete("/:idPet/:idTurn", turnDelete);

export default router;
