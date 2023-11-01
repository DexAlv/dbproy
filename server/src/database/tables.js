import { getResult } from "../helpers/methods.js";

export async function getTables() {
  const query = "SELECT distinct TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS";
  const result = await getResult(query);
  const tables = result.map((item) => item.TABLE_NAME);
  return tables;
}
