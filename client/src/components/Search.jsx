import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Table from "./Table";

function Search() {
  const { tableName, table } = useContext(AppContext);
  const [attributes, setAttributes] = useState([]);
  const [attribute, setAttribute] = useState("");
  const [element, setElement] = useState({});

  const getElement = async (element) => {
    const query = new URLSearchParams({
      attribute: attribute,
      element: element,
    });
    const url = "/db/get/" + tableName + "?" + query.toString();
    const response = await fetch(url);
    const data = await response.json();
    setElement(data);
  };

  useEffect(() => {
    setAttributes(table.attributes);
  }, [table]);

  return (
    <div className="search" style={{ margin: "10px" }}>
      <label style={{ color: "#efefef" }}>Buscar por:</label>
      <select
        name="attributes"
        id="attributes-select"
        onChange={(e) => setAttribute(e.target.value)}
      >
        {attributes.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
      <input
        type="text"
        style={{ width: "100px", background: "#efefef", marginLeft: "20px" }}
        onChange={(e) => {
          if (!e.target.value) {
            setElement({});
          } else {
            getElement(e.target.value, element);
          }
        }}
      />
      {element
        ? element.attributes &&
          element.data && (
            <Table
              attributes={element.attributes}
              data={element.data}
              key={attribute}
            />
          )
        : ""}
    </div>
  );
}

export default Search;
