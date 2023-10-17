import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "../app/assets/styles/fonts.css";
import App from "./views/App.tsx";
import "./i18n.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
