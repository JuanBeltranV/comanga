// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
// 1. Vuelve a importar BrowserRouter
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // 2. Usa BrowserRouter y AÑADE el basename
  <BrowserRouter basename="/comanga">
    <App />
  </BrowserRouter>
);