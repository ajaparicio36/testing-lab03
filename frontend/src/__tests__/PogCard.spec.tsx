import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
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
    renderComponent();
    expect(screen.getByText(symbol)).toBeInTheDocument();
  });

  it("renders pog name", () => {
    renderComponent();
    expect(screen.getByText(`Name: ${name}`)).toBeInTheDocument();
  });

  it("renders pog price", () => {
    renderComponent();
    expect(screen.getByText(`Price: ${price}`)).toBeInTheDocument();
  });

  it("renders buy button", () => {
    renderComponent();
    expect(screen.getByText("Buy")).toBeInTheDocument();
  });

  it("renders BuyModal when buy button is clicked", () => {
    renderComponent();
    const buyButton = screen.getByText("Buy");
    fireEvent.click(buyButton);
    const modalOverlay = screen.getByTestId("modal-overlay");
    expect(modalOverlay).toBeInTheDocument();
  });

  it("calls onBuy when confirm buy is clicked", () => {
    renderComponent();
    const buyButton = screen.getByText("Buy");
    fireEvent.click(buyButton);
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(onBuy).toHaveBeenCalledTimes(1);
    expect(onBuy).toHaveBeenCalledWith(id, 1);
  });
});
