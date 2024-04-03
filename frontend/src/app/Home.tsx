import React, { Fragment } from "react";
import PogCard from "../components/PogCard";

const Home = () => {
  const cardData = [
    { name: "AJ", symbol: "TYT", price: "100" },
    { name: "BJ", symbol: "TYT", price: "200" },
    { name: "CJ", symbol: "TYT", price: "300" },
    { name: "DJ", symbol: "TYT", price: "400" },
    { name: "EJ", symbol: "TYT", price: "500" },
    { name: "FJ", symbol: "TYT", price: "600" },
  ];

  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {cardData.map((card, index) => (
          <PogCard
            key={index}
            name={card.name}
            symbol={card.symbol}
            price={card.price}
            onBuy={() => console.log("Buy clicked")}
            onSell={() => console.log("Sell clicked")}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
