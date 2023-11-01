import { Router } from "express";
import { getAttributes, getResult } from "../helpers/methods.js";

const router = Router();

router.get("/get/:table", async (req, res) => {
  const table = req.params["table"];
  const col = req.query.attribute;
  const el = req.query.element;
  if(col && el){
    const query = `SELECT * FROM ${table} WHERE ${col} like '%${el}%'`;
    const attributes = await getAttributes(table);
    const data = await getResult(query);
    res.json({attributes, data})
  }
  res.status(200);
});

export default router;
