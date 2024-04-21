import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminPogCard from "../components/AdminPogCard";

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
      <div className="container mx-auto py-4 font-poppins">
        <div className="flex justify-end mb-4 gap-2">
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={handleCreateCard}
          >
            Create
          </button>
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={handleCreateCard}
          >
            Toggle Price Change
          </button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {cardData.length === 0 ? (
            <div className="flex text-gray flex-col sm:flex-row items-center justify-center w-full">
              <span>No pogs detected!</span>
            </div>
          ) : (
            cardData.map((card) => (
              <AdminPogCard
                key={card.id}
                card={card}
                editingCard={editingCard}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleUpdateCard={handleUpdateCard}
                setEditingCard={setEditingCard}
              />
            ))
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
