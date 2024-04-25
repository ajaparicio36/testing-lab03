import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import BuyModal from "../components/BuyModal";
import userEvent from "@testing-library/user-event";

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
    const { getByText } = renderComponent();
    expect(getByText(`Buy ${name}`)).toBeInTheDocument();
  });

  it("renders quantity input with correct min value", () => {
    const { getByRole } = renderComponent();
    const input = getByRole("spinbutton");
    expect(input).toHaveAttribute("min", "1");
  });

  it("calls onConfirm with correct quantity when confirm button is clicked", () => {
    const { getByText } = renderComponent();
    const confirmButton = getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledWith(1);
  });

  it("calls onCancel when cancel button is clicked", () => {
    const { getByText } = renderComponent();
    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  describe("quantity input", () => {
    it("updates value when user types a new value", async () => {
      const defaultProps: BuyModalProps = {
        id: 1,
        name: "Test Pog",
        onConfirm: jest.fn(),
        onCancel: jest.fn(),
      };
      const { getByRole } = render(<BuyModal {...defaultProps} />);
      const input = getByRole("spinbutton");

      // Clear the input field before typing
      await userEvent.clear(input);

      await userEvent.type(input, "5");

      expect(input).toHaveValue(5);
    });

    it("does not update value when user types an invalid value", () => {
      const { getByRole } = renderComponent();
      const input = getByRole("spinbutton");
      fireEvent.change(input, { target: { value: "abc" } });
      expect(input).not.toHaveValue("abc");
    });

    it("does not update value when user types a value less than 1", () => {
      const { getByRole } = renderComponent();
      const input = getByRole("spinbutton");
      fireEvent.change(input, { target: { value: "0" } });
      expect(input).not.toHaveValue("0");
    });
  });
});
