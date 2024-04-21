import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import Home from "./app/Home";
import Admin from "./app/Admin";
import Account from "./app/Account";
import Login from "./app/Login";
import Register from "./app/Register";
import Create from "./app/Create";

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
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/create" element={<Create />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want
reportWebVitals();
