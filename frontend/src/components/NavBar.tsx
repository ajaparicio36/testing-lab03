import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiPh,
  mdiAccount,
  mdiCash,
  mdiLogout,
  mdiLogin,
  mdiNote,
  mdiSecurity,
} from "@mdi/js";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's login status
  const [showPopup, setShowPopup] = useState(false); // Track pop-up visibility
  const [adminStatus, setAdminStatus] = useState(false);
  const [id, setId] = useState<number>(0);
  const [accountName, setAccountName] = useState("");
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    decryptToken();
  }, []);

  useEffect(() => {
    getBalance();
  }, [id]);

  const getBalance = async () => {
    try {
      const response = await fetch(`http://localhost:5000/balance/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error("Error getting balance:", error);
      setBalance(0);
    }
  };

  const decryptToken = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setAdminStatus(false);
        setAccountName("");
        return;
      }

      const response = await fetch("http://localhost:5000/login/decrypt/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to decrypt token");
      }

      const decodedToken = await response.json();
      setIsLoggedIn(true);
      setId(decodedToken.userId);
      setAdminStatus(decodedToken.type === "admin");
      setAccountName(decodedToken.name || "");
    } catch (error) {
      console.error("Error decrypting token:", error);
      setIsLoggedIn(false);
      setAdminStatus(false);
      setAccountName("");
    }
  };

  // Toggle pop-up visibility
  const togglePopup = () => {
    setShowPopup(!showPopup);
    console.log(accountName);
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
    localStorage.clear();
    navigate("/");
  };

  return (
    <Fragment>
      <nav className="flex font-poppins w-full h-12 bg-background px-4 items-center font-poppins justify-between border-b border-gray">
        <div
          className="text-md lg:ml-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Icon path={mdiPh} size={2} color="#9853b3" />
        </div>
        <div className="flex flex-row text-md mr-2 lg:mr-8">
          <div className="flex gap-2 mr-4 items-center text-primary">
            <Icon path={mdiCash} size={1.5} color="#9853b3" />
            <span>${balance.toFixed(2)}</span>
          </div>
          {!adminStatus ? (
            ""
          ) : (
            <div
              className="flex gap-2 mr-4 items-center text-primary cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              <Icon path={mdiSecurity} size={1} color="#9853b3" />
              <span>Admin</span>
            </div>
          )}
          <div
            className="border border-primary rounded-full p-0.5 cursor-pointer relative"
            onClick={togglePopup}
          >
            <Icon path={mdiAccount} size={1.25} color="#9853b3" />
            {showPopup && (
              <div className="absolute top-8 right-0 bg-white border border-gray rounded-md p-2 shadow-lg">
                {isLoggedIn ? (
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex flex-row gap-2 mb-2 self-center">
                      <span onClick={() => navigate("/account")}>
                        Hello, {accountName.split(" ")[0]}
                      </span>
                    </div>
                    <div
                      onClick={handleLogout}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon path={mdiLogout} size={1} color="#9853b3" />
                      <span>Log Out</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-1 flex-col gap-2">
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
