import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Fragment>
      <NavBar />
      <Outlet />
    </Fragment>
  );
};

export default App;
