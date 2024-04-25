import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SellModal from "../components/SellModal";

describe("SellModal", () => {
  const name = "Test Pog";
  const id = 1;
  const quantity = 10;
  const onConfirm = jest.fn();
  const onCancel = jest.fn();

  const renderComponent = () =>
    render(
      <SellModal
        name={name}
        id={id}
        quantity={quantity}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

  it("renders modal with correct title", () => {
    renderComponent();
    expect(screen.getByText(`Sell ${name}`)).toBeInTheDocument();
  });

  it("renders quantity input with correct max value", () => {
    renderComponent();
    const input = screen.getByLabelText("Quantity:");
    expect(input).toHaveAttribute("max", `${quantity}`);
  });

  it("calls onConfirm with correct quantity when confirm button is clicked", () => {
    renderComponent();
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledWith(1);
  });

  it("calls onCancel when cancel button is clicked", () => {
    renderComponent();
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("updates quantity input value when user types a new value", () => {
    renderComponent();
    const input = screen.getByLabelText("Quantity:");
    fireEvent.change(input, { target: { value: "5" } });
    expect(input).toHaveValue(5);
  });

  it("does not update quantity input value when user types an invalid value", () => {
    renderComponent();
    const input = screen.getByLabelText("Quantity:");
    fireEvent.change(input, { target: { value: "abc" } });
    expect(input).not.toHaveValue("abc");
  });

  it("does not update quantity input value when user types a value less than 1", () => {
    renderComponent();
    const input = screen.getByLabelText("Quantity:");
    fireEvent.change(input, { target: { value: "0" } });
    expect(input).not.toHaveValue("0");
  });
});
