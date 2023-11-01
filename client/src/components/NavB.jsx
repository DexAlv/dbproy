import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function NavB({ table }) {
  const { setTableName } = useContext(AppContext);
  const tablename = table
    .replace("_", " ")
    .replace(/(?:^|\s)\w/g, (letter) => letter.toUpperCase());

  return (
    <div className="nav-item">
      <button
        onClick={() => {
          setTableName(table);
        }}
      >
        {tablename}
      </button>
    </div>
  );
}

export default NavB;
