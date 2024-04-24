import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import PogMarquee from "../src/components/PogMarquee";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("PogMarquee", () => {
	const cardData = [
		{
			id: 1,
			name: "Card 1",
			symbol: "SYM1",
			color: "red",
			current_price: 10.0,
			previous_price: 12.0,
			percent_drop: -20.0,
		},
		{
			id: 2,
			name: "Card 2",
			symbol: "SYM2",
			color: "green",
			current_price: 15.0,
			previous_price: 10.0,
			percent_drop: 50.0,
		},
	];

	const renderPogMarquee = () => render(<PogMarquee cardData={cardData} />);

	it("renders marquee with card data", () => {
		renderPogMarquee();
		expect(screen.getByText("SYM1")).toBeInTheDocument();
		expect(screen.getByText("SYM2")).toBeInTheDocument();
	});

	it("renders card symbols with correct colors", () => {
		renderPogMarquee();
		expect(screen.getByText("SYM1")).toHaveStyle("color: red");
		expect(screen.getByText("SYM2")).toHaveStyle("color: green");
	});

	it("renders percent drop with correct color", () => {
		renderPogMarquee();
		expect(screen.getByText("-20.00%")).toHaveStyle("color: #FF0000");
		expect(screen.getByText("50.00%")).toHaveStyle("color: #00FF00");
	});

	it("renders marquee with correct background color", () => {
		renderPogMarquee();
		expect(screen.getByRole("marquee")).toHaveStyle(
			"background-color: bg-background",
		);
	});

	it("renders marquee with correct padding and margin", () => {
		renderPogMarquee();
		expect(screen.getByRole("marquee")).toHaveStyle(
			"padding: px-4 py-2; margin: mx-2",
		);
	});

	it("renders marquee with correct font and text color", () => {
		renderPogMarquee();
		expect(screen.getByRole("marquee")).toHaveStyle(
			"font-family: font-poppins; color: text-white",
		);
	});
});
