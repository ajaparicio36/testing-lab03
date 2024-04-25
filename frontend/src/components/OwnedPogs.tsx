import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiCurrencyUsd } from "@mdi/js";
import SellModal from "./SellModal";

interface OwnedPogsProps {
  name: string;
  symbol: string;
  current_price: number;
  id: number;
  quantity: number;
  handleSell: (id: number, quantity: number) => void;
}

const OwnedPogs: React.FC<OwnedPogsProps> = ({
  name,
  symbol,
  current_price,
  id,
  quantity,
  handleSell,
}) => {
  const [showSellModal, setShowSellModal] = useState(false);

  const handleSellClick = () => {
    setShowSellModal(true);
  };

  const confirmSell = (sellQuantity: number) => {
    handleSell(id, sellQuantity);
    setShowSellModal(false);
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="bg-white border border-gray rounded-md p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 font-poppins">
            <span className="text-primary font-semibold">{name}</span>{" "}
            <span className="text-gray">({symbol})</span>
          </div>
          <div className="text-accent font-semibold">Quantity: {quantity}</div>
        </div>
        <button
          data-testid="sell-button"
          className="bg-accent text-black px-4 py-2 rounded-md"
          onClick={handleSellClick}
        >
          <Icon path={mdiCurrencyUsd} size={1} color="#c793dc" />
        </button>
      </div>

      {showSellModal && (
        <SellModal
          name={name}
          id={id}
          quantity={quantity}
          onConfirm={confirmSell}
          onCancel={() => setShowSellModal(false)}
        />
      )}
    </div>
  );
};

export default OwnedPogs;
