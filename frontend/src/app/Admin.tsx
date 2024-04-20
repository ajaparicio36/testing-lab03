import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPencil, mdiDelete } from "@mdi/js";

interface CardData {
  id: number;
  name: string;
  symbol: string;
  price: string;
  color: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [editingCard, setEditingCard] = useState<CardData | null>(null);

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

  const handleEdit = (card: CardData) => {
    setEditingCard(card);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/manage/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Delete successful.");
        setCardData(cardData.filter((card) => card.id !== id));
      } else {
        console.error("Failed to delete card.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleUpdateCard = async (updatedCard: CardData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/manage/edit/${updatedCard.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCard),
        }
      );
      if (response.ok) {
        console.log("Update successful.");
        setCardData(
          cardData.map((card) =>
            card.id === updatedCard.id ? updatedCard : card
          )
        );
        setEditingCard(null);
      } else {
        console.error("Failed to update card.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleCreateCard = () => {
    navigate("/admin/create");
  };

  return (
    <Fragment>
      <div className="container mx-auto py-4">
        <div className="flex justify-end mb-4">
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={handleCreateCard}
          >
            Create
          </button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {cardData.length === 0 ? (
            <div className="flex text-gray flex-col sm:flex-row items-center justify-center w-full">
              <span>No pogs detected!</span>
            </div>
          ) : (
            cardData.map((card, index) => (
              <div
                key={index}
                className="bg-white border border-gray rounded-md p-4 flex flex-col sm:flex-row items-center justify-between"
              >
                {editingCard && editingCard.id === card.id ? (
                  <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                    <div className="flex flex-col mb-4 sm:mb-0 sm:mr-4">
                      <label
                        htmlFor="name"
                        className="text-primary font-semibold"
                      >
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
                    </div>
                    <div className="flex flex-col mb-4 sm:mb-0 sm:mr-4">
                      <label
                        htmlFor="symbol"
                        className="text-primary font-semibold"
                      >
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
                    </div>
                    <div className="flex flex-col mb-4 sm:mb-0 sm:mr-4">
                      <label
                        htmlFor="price"
                        className="text-primary font-semibold"
                      >
                        Price
                      </label>
                      <input
                        type="text"
                        id="price"
                        value={editingCard.price}
                        onChange={(e) =>
                          setEditingCard({
                            ...editingCard,
                            price: e.target.value,
                          })
                        }
                        className="border border-gray rounded-md p-2"
                      />
                    </div>
                    {/* Added color input */}
                    <div className="flex flex-col mb-4 sm:mb-0 sm:mr-4">
                      <label
                        htmlFor="color"
                        className="text-primary font-semibold"
                      >
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
                    <div className="flex items-center">
                      <div className="mr-4">
                        <span className="text-primary font-semibold">
                          {card.name}
                        </span>{" "}
                        <span className="text-gray">({card.symbol})</span>
                      </div>
                      <div className="text-accent font-semibold">
                        {card.price}
                      </div>
                      {/* Added color display */}
                      <div
                        className="h-6 w-6 rounded-full ml-2"
                        style={{ backgroundColor: card.color }}
                      ></div>
                    </div>
                    <div className="flex">
                      <button
                        className="bg-primary text-white px-4 py-2 rounded-md mr-2"
                        onClick={() => handleEdit(card)}
                      >
                        <Icon path={mdiPencil} size={1} color="#f8f5f9" />
                      </button>
                      <button
                        className="bg-gray text-white px-4 py-2 rounded-md"
                        onClick={() => handleDelete(card.id)}
                      >
                        <Icon path={mdiDelete} size={1} color="#f8f5f9" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
