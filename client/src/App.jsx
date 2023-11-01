import { useContext, useState, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import './App.css'
import NavB from "./components/NavB";
import Table from "./components/Table";
import Search from "./components/Search";

function App() {
  const { tables, tableName, getTableInfo, table, setTable } = useContext(AppContext);

  useEffect(() => {
    if (tableName) {
      async function setTableInfo() {
        const table = await getTableInfo(tableName);
        setTable(table);
      }
      setTableInfo();
    }
  }, [tableName]);

  return (
    <div className="App">
      <h2>Bienvenido al sistema de consultas de Angel</h2>
      <nav className="nav">
        {tables.map((table, index) => (
          <NavB table={table} key={index} />
        ))}
      </nav>
      <div className="content">
      {table.attributes && table.data ? (
        <div className="bod">
          <Search />
          <Table attributes={table.attributes} data={table.data} key={tableName} />
        </div>
      ) : (
        "Select a table"
      )}
      </div>
    </div>
  );
}

export default App;
