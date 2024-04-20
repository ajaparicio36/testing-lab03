import React, { Fragment, useEffect, useState } from "react";
import PogCard from "../components/PogCard";

interface CardData {
  id: number;
  name: string;
  symbol: string;
  current_price: number;
}

const Home = () => {
  const [cardData, setCardData] = useState<CardData[]>([]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch("http://localhost:5000/list");
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
      const response = await fetch(`http://localhost:5000/transact/buy/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      } else {
        console.error("Failed to sell card.");
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
          cardData.map((card, index) => (
            <PogCard
              id={card.id}
              key={index}
              name={card.name}
              symbol={card.symbol}
              price={card.current_price}
              onBuy={() => handleBuy(card.id)}
            />
          ))
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"></div>
      </div>
    </Fragment>
  );
};

export default Home;
