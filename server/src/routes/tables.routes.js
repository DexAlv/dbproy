import { Router } from "express";
import {
  addElementToTable,
  deleteElement,
  getInfoFromTable,
  updateElement,
} from "../controllers/tables.controllers.js";

const router = Router();

router.get("/:table", getInfoFromTable);
router.post("/:table", addElementToTable);
router.put('/:table', updateElement);
router.delete('/:table',deleteElement);

export default router;
