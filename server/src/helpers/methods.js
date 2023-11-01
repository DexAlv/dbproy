import { connect } from "../database/connect.js";

export const getResult = async (query) => {
  try {
    const pool = await connect();
    const result = (await pool.request().query(query)).recordset;
    return result;
  } catch (error) {
    console.error("Unable to get pool due to:", error);
  }
};

export const getAttributes = async (table) => {
  try {
    const query = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${table}'`;
    const pool = await getResult(query);
    const attributes = pool.map((item) => item.COLUMN_NAME);
    return attributes;
  } catch (error) {
    console.error("Unable to get attributes due to:", error);
  }
};

export const getData = async (table) => {
  try {
    const query = `SELECT * FROM ${table}`;
    const result = await getResult(query);
    const data = result.map((item) => item);
    return data;
  } catch (error) {
    console.error("Unable to get data due to:", error);
  }
};
