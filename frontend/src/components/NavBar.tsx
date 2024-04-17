import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiPh,
  mdiAccount,
  mdiCash,
  mdiLogout,
  mdiLogin,
  mdiNote,
} from "@mdi/js";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's login status
  const [showPopup, setShowPopup] = useState(false); // Track pop-up visibility

  const name: string = "AJ";

  // Toggle pop-up visibility
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Handle log in/log out
  const handleLogin = () => {
    setShowPopup(false);
    navigate("/login");
  };

  const handleRegister = () => {
    setShowPopup(false);
    navigate("/register");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowPopup(false);
  };

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
            className="border border-primary rounded-full p-0.5 cursor-pointer relative"
            onClick={togglePopup}
          >
            <Icon path={mdiAccount} size={1.25} color="#9853b3" />
            {showPopup && (
              <div className="absolute top-8 right-0 bg-white border border-gray rounded-md p-2 shadow-lg">
                {isLoggedIn ? (
                  <div
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Icon path={mdiLogout} size={1} color="#9853b3" />
                    <span>Log Out</span>
                  </div>
                ) : (
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex flex-row gap-2 mb-2 self-center">
                      <span>Hello, {name}</span>
                    </div>
                    <div
                      onClick={handleLogin}
                      className="flex flex-row gap-2 cursor-pointer"
                    >
                      <Icon path={mdiLogin} size={1} color="#9853b3" />
                      <span>Log In</span>
                    </div>
                    <div
                      onClick={handleRegister}
                      className="flex flex-row gap-2 cursor-pointer"
                    >
                      <Icon path={mdiNote} size={1} color="#9853b3" />
                      <span>Register</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;
