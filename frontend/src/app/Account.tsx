import React, { Fragment, useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiCurrencyUsd } from "@mdi/js";

interface CardData {
  id: number;
  name: string;
  symbol: string;
  price: string;
}

const Account = () => {
  const [userName, setUserName] = useState("AJ"); // Replace with the actual user's name
  const [userPogs, setUserPogs] = useState<CardData[]>([
    { name: "AJ", id: 1, symbol: "TYT", price: "300" },
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/account"); // Replace with the actual API endpoint
        if (response.ok) {
          const data = await response.json();
          setUserName(data.name);
          setUserPogs(data.pogs);
        } else {
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSell = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/transact/sell/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Sell transaction successful.");
        setUserPogs(userPogs.filter((pog) => pog.id !== id));
      } else {
        console.error("Failed to sell Pog.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto py-4">
        <div className="bg-white border border-gray rounded-md p-4">
          <h2 className="text-primary font-semibold mb-4">
            {userName}'s Account
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {userPogs.map((pog, index) => (
              <div
                key={index}
                className="bg-white border border-gray rounded-md p-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    <span className="text-primary font-semibold">
                      {pog.name}
                    </span>{" "}
                    <span className="text-gray">({pog.symbol})</span>
                  </div>
                  <div className="text-accent font-semibold">{pog.price}</div>
                </div>
                <button
                  className="bg-gray text-white px-4 py-2 rounded-md"
                  onClick={() => handleSell(pog.id)}
                >
                  <Icon path={mdiCurrencyUsd} size={1} color="#f8f5f9" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Account;
