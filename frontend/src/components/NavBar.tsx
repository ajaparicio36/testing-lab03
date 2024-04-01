import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";

const NavBar = () => {
  return (
    <Fragment>
      <div className="flex w-full h-8 bg-sky-300 px-4 items-center font-mono justify-between">
        <div className="text-md">PogHub</div>
        <div className="flex flex-row text-md">
          <div className="mr-4">Balance</div>
          <div>Account</div>
        </div>
      </div>
    </Fragment>
  );
};

export default NavBar;
