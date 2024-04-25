import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import OwnedPogs from "../components/OwnedPogs";
import "@testing-library/jest-dom";

describe("OwnedPogs", () => {
  const name = "Test Pog";
  const symbol = "TPG";
  const currentPrice = 10.99;
  const id = 1;
  const quantity = 1;
  const handleSell = jest.fn();

  const renderComponent = () =>
    render(
      <OwnedPogs
        name={name}
        symbol={symbol}
        current_price={currentPrice}
        id={id}
        quantity={quantity}
        handleSell={handleSell}
      />
    );

  it("renders pog name and symbol", () => {
    renderComponent();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(`(${symbol})`)).toBeInTheDocument();
  });

  it("renders quantity", () => {
    renderComponent();
    expect(screen.getByText(`Quantity: ${quantity}`)).toBeInTheDocument();
  });

  it("renders SellModal when sell button is clicked", async () => {
    renderComponent();
    const sellButton = screen.getByTestId("sell-button");

    fireEvent.click(sellButton);
    const sellModal = await screen.findByTestId("sell-modal");
    expect(sellModal).toBeInTheDocument();
  });

  it("calls handleSell when confirm sell is clicked", async () => {
    renderComponent();
    const sellButton = screen.getByRole("button");
    fireEvent.click(sellButton);
    const confirmButton = screen.getByText("Confirm"); // assuming the confirm button has the text "Confirm"
    fireEvent.click(confirmButton);
    await waitFor(() => expect(handleSell).toHaveBeenCalledTimes(1));
    expect(handleSell).toHaveBeenCalledWith(id, quantity);
  });
});
