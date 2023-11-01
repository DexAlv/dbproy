import express from "express";

import tables from "./routes/tables.routes.js";
import get from "./routes/get.routes.js";
import { getTables } from "./database/tables.js";

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const tables = await getTables();
    res.json({ tables });
  } catch (error) {
    res.status(500).send("Unable to get tables (server) due to:", error);
  }
});

app.use(tables);
app.use(get);

export default app;
