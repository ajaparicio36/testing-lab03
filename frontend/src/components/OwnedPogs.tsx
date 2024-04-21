import React from "react";
import Icon from "@mdi/react";
import { mdiCurrencyUsd } from "@mdi/js";

interface OwnedPogsProps {
  name: string;
  symbol: string;
  current_price: number;
  id: number;
  handleSell: (id: number) => void;
}

const OwnedPogs: React.FC<OwnedPogsProps> = ({
  name,
  symbol,
  current_price,
  id,
  handleSell,
}) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="bg-white border border-gray rounded-md p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 font-poppins">
            <span className="text-primary font-semibold">{name}</span>{" "}
            <span className="text-gray">({symbol})</span>
          </div>
          <div className="text-accent font-semibold">${current_price}</div>
        </div>
        <button
          className="bg-accent text-black px-4 py-2 rounded-md"
          onClick={() => handleSell(id)}
        >
          <Icon path={mdiCurrencyUsd} size={1} color="#c793dc" />
        </button>
      </div>
    </div>
  );
};

export default OwnedPogs;
