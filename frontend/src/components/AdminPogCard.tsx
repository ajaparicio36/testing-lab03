import React from "react";
import Icon from "@mdi/react";
import { mdiPencil, mdiDelete, mdiFinance } from "@mdi/js";

interface CardData {
  id: number;
  name: string;
  symbol: string;
  current_price: number;
  previous_price: number;
  percent_drop: number;
  color: string;
}

interface AdminPogCardProps {
  card: CardData;
  editingCard: CardData | null;
  handleEdit: (card: CardData) => void;
  handleDelete: (id: number) => Promise<void>;
  handleUpdateCard: (updatedCard: CardData) => Promise<void>;
  handleFluctuate: (id: number) => Promise<void>;
  setEditingCard: React.Dispatch<React.SetStateAction<CardData | null>>;
}

const AdminPogCard: React.FC<AdminPogCardProps> = ({
  card,
  editingCard,
  handleEdit,
  handleDelete,
  handleUpdateCard,
  handleFluctuate,
  setEditingCard,
}) => {
  return (
    <div
      key={card.id}
      className="bg-white border border-gray rounded-md p-4 flex flex-col sm:flex-row items-center justify-between"
    >
      {editingCard && editingCard.id === card.id ? (
        <div className="flex flex-col sm:flex-row items-center justify-between w-full">
          <div className="flex flex-col mb-4 sm:mb-0 sm:mr-4">
            <label htmlFor="name" className="text-primary font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={editingCard.name}
              onChange={(e) =>
                setEditingCard({
                  ...editingCard,
                  name: e.target.value,
                })
              }
              className="border border-gray rounded-md p-2"
            />
            <label htmlFor="symbol" className="text-primary font-semibold">
              Symbol
            </label>
            <input
              type="text"
              id="symbol"
              value={editingCard.symbol}
              onChange={(e) =>
                setEditingCard({
                  ...editingCard,
                  symbol: e.target.value,
                })
              }
              className="border border-gray rounded-md p-2"
            />
            <label htmlFor="color" className="text-primary font-semibold">
              Color
            </label>
            <input
              type="color"
              id="color"
              value={editingCard.color}
              onChange={(e) =>
                setEditingCard({
                  ...editingCard,
                  color: e.target.value,
                })
              }
              className="border border-gray rounded-md p-2"
            />
          </div>
          <div className="flex flex-col sm:flex-row">
            <button
              className="bg-secondary text-white px-4 py-2 rounded-md mr-2 mb-2 sm:mb-0"
              onClick={() => handleUpdateCard(editingCard)}
            >
              Confirm
            </button>
            <button
              className="bg-gray text-white px-4 py-2 rounded-md"
              onClick={() => setEditingCard(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <div className="mr-4">
              <span className="text-primary font-semibold">{card.name}</span>{" "}
              <span className="text-gray">({card.symbol})</span>
            </div>
            <div className="text-accent font-semibold">
              Current: {card.current_price}
            </div>
            <div className="text-accent font-semibold">
              Previous: {card.previous_price}
            </div>
            <div
              className="h-6 w-6 rounded-full ml-2"
              style={{ backgroundColor: card.color }}
            ></div>
          </div>
          <div className="flex gap-2">
            <button
              data-testid="edit-button"
              className="bg-primary text-white px-4 py-2 rounded-md"
              onClick={() => handleEdit(card)}
            >
              <Icon path={mdiPencil} size={1} color="#f8f5f9" />
            </button>
            <button
              data-testid="delete-button"
              className="bg-primary text-white px-4 py-2 rounded-md"
              onClick={() => handleDelete(card.id)}
            >
              <Icon path={mdiDelete} size={1} color="#f8f5f9" />
            </button>
            <button
              data-testid="fluctuate-button"
              className="bg-primary text-white px-4 py-2 rounded-md"
              onClick={() => handleFluctuate(card.id)}
            >
              <Icon path={mdiFinance} size={1} color="#f8f5f9" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPogCard;
