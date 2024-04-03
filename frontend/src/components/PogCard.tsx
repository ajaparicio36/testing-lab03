import React from "react";

interface PogCardProps {
  onBuy: () => void;
  onSell: () => void;
  name: string;
  symbol: string;
  price: string;
}

const PogCard: React.FC<PogCardProps> = ({
  onBuy,
  onSell,
  name,
  symbol,
  price,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mx-auto flex flex-1">
      <div className="p-4 bg-primary text-white">
        <h2 className="text-xl font-semibold">{symbol}</h2>
      </div>
      <div className="p-4">
        <div className="pog-info mb-4">
          <div className="text-gray-600">Name: {name}</div>
          <div className="text-gray-600">Price: {price}</div>
        </div>
        <div className="buttons flex justify-end">
          <button
            className="bg-secondary hover:bg-accent text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => onBuy()}
          >
            Buy
          </button>
          <button
            className="bg-secondary hover:bg-accent text-white font-bold py-2 px-4 rounded"
            onClick={() => onSell()}
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default PogCard;
