import React, { Fragment, useEffect, useState } from "react";
import PogCard from "../components/PogCard";

interface CardData {
  id: number;
  name: string;
  symbol: string;
  color: string;
  current_price: number;
}

const Home = () => {
  const [cardData, setCardData] = useState<CardData[]>([]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch("http://localhost:5000/list/unowned");
        if (response.ok) {
          const data: CardData[] = await response.json();
          setCardData(data);
        } else {
          console.error("Failed to fetch card data.");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchCardData();
  }, []);

  const handleBuy = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/transact/buy/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("Buy transaction successful.");
      } else {
        console.error("Failed to buy card.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto py-4">
        {cardData.length === 0 ? (
          <div className="flex text-gray flex-col sm:flex-row items-center justify-center w-full">
            <span>No pogs detected!</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {cardData.map((card) => (
              <PogCard
                id={card.id}
                key={card.id}
                name={card.name}
                color={card.color}
                symbol={card.symbol}
                price={card.current_price}
                onBuy={() => handleBuy(card.id)}
              />
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
