// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';                          // Tu CSS global (copialo aquí)
import App from './App.js';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/comanga">
    <App />
  </BrowserRouter>
);