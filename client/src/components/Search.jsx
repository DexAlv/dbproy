import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Table from "./Table";

function Search() {
  const { tableName, table, setTable } = useContext(AppContext);
  const [tabCop, setTabCop] = useState(table);
  const [attribute, setAttribute] = useState("");

  const getElement = async (element) => {
    const query = new URLSearchParams({
      attribute: attribute,
      element: element,
    });
    const url = "/db/get/" + tableName + "?" + query.toString();
    const response = await fetch(url);
    const data = await response.json();
    setTable(data);
  };
  
  return (
    <div className="search" style={{ margin: "10px" }}>
      <label style={{ color: "#efefef" }}>Buscar por:</label>
      <select
        name="attributes"
        id="attributes-select"
        onChange={(e) => setAttribute(e.target.value)}
      >
        {table.attributes.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
      <input
        type="text"
        style={{ width: "100px", background: "#efefef", marginLeft: "20px" }}
        onChange={(e) => {
          if (!e.target.value) {
            setTable(tabCop);
          } else {
            getElement(e.target.value);
          }
        }}
      />
    </div>
  );
}

export default Search;
