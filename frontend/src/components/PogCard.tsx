import React, { useState } from "react";
import BuyModal from "./BuyModal";

interface PogCardProps {
  onBuy: (id: number, quantity: number) => void;
  name: string;
  symbol: string;
  price: number;
  id: number;
  color: string;
}

const PogCard: React.FC<PogCardProps> = ({
  onBuy,
  name,
  symbol,
  price,
  id,
  color,
}) => {
  const [showBuyModal, setShowBuyModal] = useState(false);

  const handleBuy = () => {
    setShowBuyModal(true);
  };

  const confirmBuy = (buyQuantity: number) => {
    onBuy(id, buyQuantity);
    setShowBuyModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mx-auto flex flex-1">
      <div style={{ backgroundColor: color }} className={`p-4 text-gray`}>
        <h2 className="text-xl font-semibold">{symbol}</h2>
      </div>
      <div className="p-4">
        <div className="pog-info mb-4 font-poppins">
          <div className="text-black">Name: {name}</div>
          <div className="text-black">Price: {price}</div>
        </div>
        <div className="buttons flex justify-end">
          <button
            className="bg-[#c793dc] hover:bg-[#b65bd9] text-[#f8f5f9] font-bold py-2 px-4 rounded mr-2"
            onClick={handleBuy}
          >
            Buy
          </button>
        </div>
      </div>

      {showBuyModal && (
        <BuyModal
          id={id}
          name={name}
          onConfirm={confirmBuy}
          onCancel={() => setShowBuyModal(false)}
        />
      )}
    </div>
  );
};

export default PogCard;
