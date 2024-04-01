import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";

import { mdiPh, mdiAccount, mdiCash } from "@mdi/js";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="flex w-full h-12 bg-sky-300 px-4 items-center font-poppins justify-between">
        <div className="text-md lg:ml-4" onClick={() => navigate("/")}>
          <Icon path={mdiPh} size={2} color="black" />
        </div>
        <div className="flex flex-row text-md mr-2 lg:mr-8">
          <div className="flex gap-2 mr-4 items-center">
            <Icon path={mdiCash} size={1.5} color="black" />
            <span>Balance</span>
          </div>
          <div className="border border-black rounded-full p-0.5">
            <span onClick={() => navigate("/account")}>
              <Icon path={mdiAccount} size={1.25} color="black" />
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NavBar;
