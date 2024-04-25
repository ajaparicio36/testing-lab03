/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PogMarquee from "../components/PogMarquee";
import "resize-observer-polyfill";

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
    render(<PogMarquee cardData={cardData} />);

    const sym1Elements = screen.getAllByText("SYM1");
    const negativePercentElements = screen.getAllByText("-20.00%");
    const sym2Elements = screen.getAllByText("SYM2");
    const positivePercentElements = screen.getAllByText("50.00%");

    expect(sym1Elements.length).toBe(2);
    expect(negativePercentElements.length).toBe(2);
    expect(sym2Elements.length).toBe(2);
    expect(positivePercentElements.length).toBe(2);
  });

  it("renders marquee with correct styles", () => {
    const { container } = render(<PogMarquee cardData={cardData} />);

    expect(
      container.getElementsByClassName("bg-background").length
    ).toBeGreaterThan(0);
    expect(
      container.getElementsByClassName("text-[#FF0000]").length
    ).toBeGreaterThan(0);
    expect(
      container.getElementsByClassName("text-[#00FF00]").length
    ).toBeGreaterThan(0);
  });

  it("pauses marquee on hover", () => {
    const { container } = render(<PogMarquee cardData={cardData} />);
    const marquee = container.getElementsByClassName(
      "rfm-marquee-container"
    )[0];

    fireEvent.mouseOver(marquee);
    const computedStyle = window.getComputedStyle(marquee);
    const pauseOnHover = computedStyle.getPropertyValue("--pause-on-hover");

    expect(pauseOnHover).toBe("paused");
  });
});
