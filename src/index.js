// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
// 1. CAMBIA ESTA LÍNEA:
import { HashRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';
import App from './App.js';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // 2. CAMBIA ESTO (y quita el basename):
  <HashRouter>
    <App />
  </HashRouter>
);