import React from "react";

interface PogCardProps {
  onEdit: () => void;
  onDelete: () => void;
  name: string;
  symbol: string;
  price: string;
}

const PogCard: React.FC<PogCardProps> = ({
  onEdit,
  onDelete,
  name,
  symbol,
  price,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mx-auto max-w-md">
      <div className="p-4 bg-primary text-white">
        <h2 className="text-xl font-semibold">{name}</h2>
      </div>
      <div className="p-4">
        <div className="pog-info mb-4">
          <div className="text-gray-600">Symbol: {symbol}</div>
          <div className="text-gray-600">Price: {price}</div>
        </div>
        <div className="buttons flex justify-end">
          <button
            className="bg-secondary hover:bg-accent text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => onEdit()}
          >
            Edit
          </button>
          <button
            className="bg-secondary hover:bg-accent text-white font-bold py-2 px-4 rounded"
            onClick={() => onDelete()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PogCard;
