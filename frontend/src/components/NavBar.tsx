import React, { Fragment } from "react";

const NavBar = () => {
  return (
    <Fragment>
      <div className="flex w-full h-12 bg-sky-300 px-4 items-center font-mono">
        <div className="flex flex-1 text-lg self-center">PogHub</div>
      </div>
    </Fragment>
  );
};

export default NavBar;
