import React from "react";
import { render, fireEvent } from "@testing-library/react";
import OwnedPogs from "../src/components/OwnedPogs";

describe("OwnedPogs", () => {
	const name = "Test Pog";
	const symbol = "TPG";
	const currentPrice = 10.99;
	const id = 1;
	const handleSell = jest.fn();

	const renderComponent = () =>
		render(
			<OwnedPogs
				name={name}
				symbol={symbol}
				current_price={currentPrice}
				id={id}
				handleSell={handleSell}
			/>,
		);

	it("renders pog name and symbol", () => {
		const { getByText } = renderComponent();
		expect(getByText(name)).toBeInTheDocument();
		expect(getByText(`(${symbol})`)).toBeInTheDocument();
	});

	it("renders current price", () => {
		const { getByText } = renderComponent();
		expect(getByText(`$${currentPrice}`)).toBeInTheDocument();
	});

	it("renders sell button with icon", () => {
		const { getByRole } = renderComponent();
		const sellButton = getByRole("button");
		expect(sellButton).toBeInTheDocument();
		expect(sellButton.querySelector("svg")).toBeInTheDocument();
	});

	it("calls handleSell when sell button is clicked", () => {
		const { getByRole } = renderComponent();
		const sellButton = getByRole("button");
		fireEvent.click(sellButton);
		expect(handleSell).toHaveBeenCalledTimes(1);
		expect(handleSell).toHaveBeenCalledWith(id);
	});
});
