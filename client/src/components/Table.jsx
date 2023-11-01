import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function Table({ attributes, data }) {
  const { tableName } = useContext(AppContext);
  const [element, setElement] = useState({});

  const elementObj = (array) => {
    let obj = {};
    const arr = array.slice(1);
    arr.forEach((element) => {
      obj[element] = "";
    });
    setElement(obj);
  };
  const sendData = async (element) => {
    try {
      const data = {
        values: element,
        table: tableName,
      };
      await fetch("/db/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Unable to post data due to:", error);
    }
  };
  const editValue = async (column, id) => {
    const val = prompt("Ingrese el nuevo valor de " + column);
    if (val) {
      await fetch("/db/tables", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: tableName,
          id: id,
          col: column,
          val: val,
        }),
      });
    }
  };

  const deleteData = async (id) => {
    try {
      const data = {
        table: tableName,
        id: id,
      };
      await fetch("/db/tables", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Unable to delete element (client) due to:", error);
    }
  };

  useEffect(() => {
    elementObj(attributes);
  }, [attributes]);

  return (
    <div className="tab-cont">
      <table>
        <thead>
          <tr>
            <th> </th>
            {attributes.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <button
                  style={{
                    background: "none",
                    outline: "none",
                    border: "none",
                  }}
                  onClick={() => {
                    deleteData(item[attributes[0]]);
                  }}
                >
                  <MdDelete style={{ color: "#DE3163" }} />
                </button>
              </td>
              {attributes.map((attribute, colIndex) => (
                <td key={colIndex} id={attribute}>
                  <div className="flex-cont">
                    <div className="flex-item">{item[attribute]}</div>
                    {colIndex > 0 && (
                      <div className="flex-item">
                        <button
                          style={{ background: "none", border: "none" }}
                          onClick={() => {
                            editValue(
                              attributes[colIndex],
                              item[attributes[0]]
                            );
                          }}
                        >
                          <FaEdit style={{ color: "#00b4d8" }} />
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td></td>
            {attributes.map((item, index) => (
              <td>
                {index > 0 ? (
                  <input
                    type="text"
                    id={item}
                    key={index}
                    onChange={(e) => {
                      setElement({ ...element, [item]: e.target.value });
                    }}
                  />
                ) : (
                  <button
                    key={index}
                    className="add-btn"
                    onClick={() => {
                      sendData(element);
                    }}
                  >
                    Agregar
                  </button>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
