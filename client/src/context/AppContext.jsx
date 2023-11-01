import { useState, useEffect, createContext } from "react";

export const AppContext = createContext();

export function AppContextProvider(props) {
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState("");
  const [table, setTable] = useState({});

  const getTableInfo = async (table) => {
    try {
      const response = await fetch("/db/" + table);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Unable to get table due to:", error);
    }
  };

  const getServerTables = async () => {
    try {
      const response = await fetch("/db/");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Unable to get tables from server due to:", error);
    }
  };

  useEffect(() => {
    async function setServerTables() {
      const { tables } = await getServerTables();
      setTables(tables);
    }
    setServerTables();
  }, []);

  const contextValue = {
    tables,
    tableName,
    setTableName,
    getTableInfo,
    table,
    setTable,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
}
