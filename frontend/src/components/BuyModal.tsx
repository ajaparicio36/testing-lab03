import React, { useState } from "react";

interface BuyModalProps {
  id: number;
  name: string;
  onConfirm: (buyQuantity: number) => void;
  onCancel: () => void;
}

const BuyModal: React.FC<BuyModalProps> = ({
  id,
  name,
  onConfirm,
  onCancel,
}) => {
  const [buyQuantity, setBuyQuantity] = useState(1);

  const handleConfirm = () => {
    onConfirm(buyQuantity);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      setBuyQuantity(newValue);
    }
  };

  return (
    <div
      data-testid="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Buy {name}</h2>
        <div className="mb-4">
          <label htmlFor="quantity" className="block font-bold mb-2">
            Quantity:
          </label>
          <input
            type="number"
            id="buyQuantity"
            min="1"
            value={buyQuantity}
            onChange={handleQuantityChange}
            className="border border-gray-400 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-[#c793dc] hover:bg-[#b65bd9] text-[#f8f5f9] font-bold py-2 px-4 rounded mr-2"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
