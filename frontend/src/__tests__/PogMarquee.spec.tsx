import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import PogMarquee from "../components/PogMarquee";

interface CardData {
	id: number;
	name: string;
	symbol: string;
	color: string;
	current_price: number;
	previous_price: number;
	percent_drop: number;
}

describe("PogMarquee", () => {
	const cardData: CardData[] = [
		{
			id: 1,
			name: "Card 1",
			symbol: "SYM1",
			color: "red",
			current_price: 10,
			previous_price: 12,
			percent_drop: -20,
		},
		{
			id: 2,
			name: "Card 2",
			symbol: "SYM2",
			color: "green",
			current_price: 15,
			previous_price: 10,
			percent_drop: 50,
		},
	];

	it("renders marquee with correct elements", () => {
		const { getByText } = render(<PogMarquee cardData={cardData} />);

		expect(getByText("SYM1")).toBeInTheDocument();
		expect(getByText("-20.00%")).toBeInTheDocument();
		expect(getByText("SYM2")).toBeInTheDocument();
		expect(getByText("50.00%")).toBeInTheDocument();
	});

	it("renders marquee with correct styles", () => {
		const { container } = render(<PogMarquee cardData={cardData} />);

		expect(
			container.getElementsByClassName("bg-background").length,
		).toBeGreaterThan(0);
		expect(
			container.getElementsByClassName("text-[#FF0000]").length,
		).toBeGreaterThan(0);
		expect(
			container.getElementsByClassName("text-[#00FF00]").length,
		).toBeGreaterThan(0);
	});

	it("pauses marquee on hover", () => {
		const { container } = render(<PogMarquee cardData={cardData} />);

		const marquee = container.getElementsByClassName("w-full")[0];
		fireEvent.mouseOver(marquee);

		expect(marquee.classList.contains("paused")).toBe(true);
	});
});
