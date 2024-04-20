import React from "react";

interface PogCardProps {
  onBuy: (id: number) => void;
  onSell: (id: number) => void;
  name: string;
  symbol: string;
  price: string;
  id: number;
}

const PogCard: React.FC<PogCardProps> = ({
  onBuy,
  onSell,
  name,
  symbol,
  price,
  id,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mx-auto flex flex-1">
      <div className="p-4 bg-[#9853b3] text-[#f8f5f9]">
        <h2 className="text-xl font-semibold">{symbol}</h2>
      </div>
      <div className="p-4">
        <div className="pog-info mb-4">
          <div className="text-[#d1d5db]">Name: {name}</div>
          <div className="text-[#d1d5db]">Price: {price}</div>
        </div>
        <div className="buttons flex justify-end">
          <button
            className="bg-[#c793dc] hover:bg-[#b65bd9] text-[#f8f5f9] font-bold py-2 px-4 rounded mr-2"
            onClick={() => onBuy(id)}
          >
            Buy
          </button>
          <button
            className="bg-[#c793dc] hover:bg-[#b65bd9] text-[#f8f5f9] font-bold py-2 px-4 rounded"
            onClick={() => onSell(id)}
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default PogCard;
