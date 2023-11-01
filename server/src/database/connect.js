import sql from "mssql";
import config from "../config.js";

const { user, password, database } = config;

const dbConfig = {
  user: user,
  password: password,
  database: database,
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function connect() {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.log("Unable to connect due to:", error);
  }
}
