import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BuyModal from "../components/BuyModal";

interface BuyModalProps {
  id: number;
  name: string;
  onConfirm: (buyQuantity: number) => void;
  onCancel: () => void;
}

describe("BuyModal", () => {
  const id = 1;
  const name = "Test Pog";
  const onConfirm = jest.fn();
  const onCancel = jest.fn();

  const renderComponent = () =>
    render(
      <BuyModal id={id} name={name} onConfirm={onConfirm} onCancel={onCancel} />
    );

  it("renders modal with correct title", () => {
    renderComponent();
    expect(screen.getByText(`Buy ${name}`)).toBeInTheDocument();
  });

  it("renders quantity input with correct min value", () => {
    renderComponent();
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveAttribute("min", "1");
  });

  it("calls onConfirm with correct quantity when confirm button is clicked", async () => {
    renderComponent();
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    await waitFor(() => expect(onConfirm).toHaveBeenCalledTimes(1));
    expect(onConfirm).toHaveBeenCalledWith(1);
  });

  it("calls onCancel when cancel button is clicked", async () => {
    renderComponent();
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    await waitFor(() => expect(onCancel).toHaveBeenCalledTimes(1));
  });

  describe("quantity input", () => {
    it("updates value when user types a new value", async () => {
      const defaultProps: BuyModalProps = {
        id: 1,
        name: "Test Pog",
        onConfirm: jest.fn(),
        onCancel: jest.fn(),
      };
      render(<BuyModal {...defaultProps} />);
      const input = screen.getByRole("spinbutton");

      await userEvent.clear(input);
      await userEvent.type(input, "5");

      expect(input).toHaveValue(5);
    });

    it("does not update value when user types an invalid value", () => {
      renderComponent();
      const input = screen.getByRole("spinbutton");
      fireEvent.change(input, { target: { value: "abc" } });
      expect(input).not.toHaveValue("abc");
    });

    it("does not update value when user types a value less than 1", () => {
      renderComponent();
      const input = screen.getByRole("spinbutton");
      fireEvent.change(input, { target: { value: "0" } });
      expect(input).not.toHaveValue("0");
    });
  });
});
