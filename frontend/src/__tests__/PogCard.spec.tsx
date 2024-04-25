import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PogCard from "../components/PogCard";

describe("PogCard", () => {
  const name = "Test Pog";
  const symbol = "TPG";
  const price = 10.99;
  const id = 1;
  const color = "#ff0000";
  const onBuy = jest.fn();

  const renderComponent = () =>
    render(
      <PogCard
        onBuy={onBuy}
        name={name}
        symbol={symbol}
        price={price}
        id={id}
        color={color}
      />
    );

  it("renders pog symbol", () => {
    const { getByText } = renderComponent();
    expect(getByText(symbol)).toBeInTheDocument();
  });

  it("renders pog name", () => {
    const { getByText } = renderComponent();
    expect(getByText(`Name: ${name}`)).toBeInTheDocument();
  });

  it("renders pog price", () => {
    const { getByText } = renderComponent();
    expect(getByText(`Price: ${price}`)).toBeInTheDocument();
  });

  it("renders buy button", () => {
    const { getByText } = renderComponent();
    expect(getByText("Buy")).toBeInTheDocument();
  });

  it("renders BuyModal when buy button is clicked", () => {
    const { getByText, getByTestId } = renderComponent();
    const buyButton = getByText("Buy");
    fireEvent.click(buyButton);
    const modalOverlay = getByTestId("modal-overlay");
    expect(modalOverlay).toBeInTheDocument();
  });

  it("calls onBuy when confirm buy is clicked", () => {
    const { getByText } = renderComponent();
    const buyButton = getByText("Buy");
    fireEvent.click(buyButton);
    const confirmButton = getByText("Confirm"); // assuming the BuyModal has a confirm button with the text "Confirm"
    fireEvent.click(confirmButton);
    expect(onBuy).toHaveBeenCalledTimes(1);
    expect(onBuy).toHaveBeenCalledWith(id, 1); // assuming the default quantity is 1
  });
});
