import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPh, mdiAccount, mdiCash } from "@mdi/js";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <nav className="flex w-full h-12 bg-background px-4 items-center font-poppins justify-between border-b border-gray">
        <div
          className="text-md lg:ml-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Icon path={mdiPh} size={2} color="#9853b3" />
        </div>
        <div className="flex flex-row text-md mr-2 lg:mr-8">
          <div className="flex gap-2 mr-4 items-center text-primary">
            <Icon path={mdiCash} size={1.5} color="#9853b3" />
            <span>Balance</span>
          </div>
          <div
            className="border border-primary rounded-full p-0.5 cursor-pointer"
            onClick={() => navigate("/account")}
          >
            <Icon path={mdiAccount} size={1.25} color="#9853b3" />
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;
