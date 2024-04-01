import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import Home from "./app/Home";
import Admin from "./admin/Admin";
import Account from "./app/Account";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/account/:id" element={<Account />} />
        </Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want
reportWebVitals();
