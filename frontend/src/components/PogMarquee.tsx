import React from "react";
import Marquee from "react-fast-marquee";

interface CardData {
  id: number;
  name: string;
  symbol: string;
  color: string;
  current_price: number;
  previous_price: number;
  percent_drop: number;
}

const PogMarquee = ({ cardData }: { cardData: CardData[] }) => {
  return (
    <Marquee pauseOnHover gradient={false} className="w-full bg-background">
      {cardData.map((card) => (
        <div
          key={card.id}
          className={`px-4 py-2 rounded-md mx-2 flex items-center font-poppins text-white bg-secondary`}
        >
          <span className="font-bold">{card.symbol}</span>
          <span
            className={`ml-2 ${
              card.percent_drop < 0 ? "text-[#FF0000]" : "text-[#00FF00]"
            }`}
          >
            {card.percent_drop.toFixed(2)}%
          </span>
        </div>
      ))}
    </Marquee>
  );
};

export default PogMarquee;
