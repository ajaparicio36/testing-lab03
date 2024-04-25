import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AdminPogCard from "../components/AdminPogCard";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

interface CardData {
  id: number;
  name: string;
  symbol: string;
  current_price: number;
  previous_price: number;
  percent_drop: number;
  color: string;
}

describe("AdminPogCard", () => {
  const card: CardData = {
    id: 1,
    name: "Card 1",
    symbol: "CARD1",
    current_price: 10.99,
    previous_price: 9.99,
    color: "#ff0000",
    percent_drop: 0, // add this property
  };

  const handleEdit = jest.fn();
  const handleDelete = jest.fn();
  const handleUpdateCard = jest.fn();
  const handleFluctuate = jest.fn();
  const setEditingCard = jest.fn();

  const renderAdminPogCard = (editingCard: typeof card | null = null) =>
    render(
      <AdminPogCard
        card={card}
        editingCard={editingCard}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleUpdateCard={handleUpdateCard}
        handleFluctuate={handleFluctuate}
        setEditingCard={setEditingCard}
      />
    );

  it("renders card details", () => {
    renderAdminPogCard();
    expect(screen.getByText(card.name)).toBeInTheDocument();
  });

  it("renders edit form when editing", () => {
    renderAdminPogCard(card);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("calls handleEdit when edit button is clicked", async () => {
    renderAdminPogCard(null); // Pass null as editingCard
    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);
    await waitFor(() => expect(handleEdit).toHaveBeenCalledTimes(1));
  });

  it("calls handleDelete when delete button is clicked", async () => {
    renderAdminPogCard(null); // Pass null as editingCard
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
    await waitFor(() => expect(handleDelete).toHaveBeenCalledTimes(1));
  });

  it("calls handleFluctuate when fluctuate button is clicked", async () => {
    renderAdminPogCard(null); // Pass null as editingCard
    const fluctuateButton = screen.getByTestId("fluctuate-button");
    fireEvent.click(fluctuateButton);
    await waitFor(() => expect(handleFluctuate).toHaveBeenCalledTimes(1));
  });

  it("updates editingCard state when input values change", () => {
    renderAdminPogCard(card);
    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "New Name" } });
    expect(setEditingCard).toHaveBeenCalledTimes(1);
  });

  it("calls handleUpdateCard when confirm button is clicked", () => {
    renderAdminPogCard(card);
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(handleUpdateCard).toHaveBeenCalledTimes(1);
  });
});
