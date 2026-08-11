import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ContextProvide } from "./context/MyContext.jsx";

createRoot(document.getElementById("root")).render(
  <ContextProvide>
    <App />
  </ContextProvide>,
);
