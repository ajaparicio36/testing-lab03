import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import BuyModal from "../components/BuyModal";

describe("BuyModal", () => {
	const id = 1;
	const name = "Test Pog";
	const onConfirm = jest.fn();
	const onCancel = jest.fn();

	const renderComponent = () =>
		render(
			<BuyModal
				id={id}
				name={name}
				onConfirm={onConfirm}
				onCancel={onCancel}
			/>,
		);

	it("renders modal with correct title", () => {
		const { getByText } = renderComponent();
		expect(getByText(`Buy ${name}`)).toBeInTheDocument();
	});

	it("renders quantity input with correct min value", () => {
		const { getByLabelText } = renderComponent();
		const input = getByLabelText("Quantity:");
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
		it("updates value when user types a new value", () => {
			const { getByLabelText } = renderComponent();
			const input = getByLabelText("Quantity:");
			fireEvent.change(input, { target: { value: "5" } });
			expect(input).toHaveValue("5");
		});

		it("does not update value when user types an invalid value", () => {
			const { getByLabelText } = renderComponent();
			const input = getByLabelText("Quantity:");
			fireEvent.change(input, { target: { value: "abc" } });
			expect(input).not.toHaveValue("abc");
		});

		it("does not update value when user types a value less than 1", () => {
			const { getByLabelText } = renderComponent();
			const input = getByLabelText("Quantity:");
			fireEvent.change(input, { target: { value: "0" } });
			expect(input).not.toHaveValue("0");
		});
	});
});
