import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import OwnedPogs from "../components/OwnedPogs";
import { act } from "react-dom/test-utils";
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
    const { getByText } = renderComponent();
    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(`(${symbol})`)).toBeInTheDocument();
  });

  it("renders quantity", () => {
    const { getByText } = renderComponent();
    expect(getByText(`Quantity: ${quantity}`)).toBeInTheDocument();
  });

  it("renders SellModal when sell button is clicked", async () => {
    const { getByTestId, findByTestId } = renderComponent();
    const sellButton = getByTestId("sell-button");

    fireEvent.click(sellButton);
    const sellModal = await findByTestId("sell-modal");
    expect(sellModal).toBeInTheDocument();
  });

  it("calls handleSell when confirm sell is clicked", () => {
    const { getByRole, getByText } = renderComponent();
    const sellButton = getByRole("button");
    fireEvent.click(sellButton);
    const confirmButton = getByText("Confirm"); // assuming the confirm button has the text "Confirm"
    fireEvent.click(confirmButton);
    expect(handleSell).toHaveBeenCalledTimes(1);
    expect(handleSell).toHaveBeenCalledWith(id, quantity);
  });
});
