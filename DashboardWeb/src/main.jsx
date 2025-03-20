import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import Rotas from "./Routes";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Rotas />
  </BrowserRouter>
);
