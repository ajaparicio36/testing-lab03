import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import Home from "./app/Home";
import Admin from "./admin/Admin";
import Pogs from "./app/Pogs";
import Account from "./app/Account";
import Login from "./app/Login";
import Register from "./app/Register";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/pogs/:id" element={<Pogs />} />
          <Route path="/account" element={<Account />} />
        </Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want
reportWebVitals();
