import { getAttributes, getData, getResult } from "../helpers/methods.js";
import { getTables } from "../database/tables.js";

const tables = await getTables();

export const getInfoFromTable = async (req, res) => {
  try {
    const table = req.params["table"];
    if (tables.includes(table)) {
      const attributes = await getAttributes(table);
      const data = await getData(table);
      res.json({ attributes, data });
    } else {
      res.send("Table not found");
    }
  } catch (error) {
    console.error("Unable to get info from table due to:", error);
  }
};

export const addElementToTable = async (req, res) => {
  try {
    const table = req.body.table;
    const attributes = (await getAttributes(table)).slice(1);
    const values = Object.values(req.body.values).map((val) => `'${val}'`);
    const query = `INSERT INTO ${table} (${attributes}) VALUES (${values})`;
    const result = await getResult(query);
    res.status(200);
  } catch (error) {
    res
      .status(500)
      .send(console.log("Unable to add element to table due to:", error));
  }
};

export const updateElement = async (req, res) => {
  try {
    const { table, id, col, val } = req.body;
    const idTable = await getAttributes(table);
    const query = `UPDATE ${table} SET ${col} = '${val}' WHERE ${idTable[0]} = ${id}`;
    const result = await getResult(query);
    res.status(200);
  } catch (error) {
    console.error("Unable to update element (server) due to:", error);
  }
};

export const deleteElement = async (req, res) => {
  try {
    const { table, id } = req.body;
    const idTable = await getAttributes(table);
    const query = `DELETE FROM ${table} WHERE ${idTable[0]} = ${id}`;
    const result = await getResult(query);
    res.status(200).send("Deleted item successfully");
  } catch (error) {
    console.error("Unable to delete from table due to:", error);
  }
};
