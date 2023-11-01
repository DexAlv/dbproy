import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './index.css'
import { AppContextProvider } from "./context/AppContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </StrictMode>
);
