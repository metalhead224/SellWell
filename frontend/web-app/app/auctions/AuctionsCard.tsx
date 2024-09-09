import React from "react";
import CountdownTimer from "./CountdownTimer";
import CarImage from "./CarImage";
import { Auction } from "../types/Index";

type Props = {
  auction: Auction;
};

export default function AuctionsCard({ auction }: Props) {
  return (
    <a href="#" className="group">
      <div className="relative w-full bg-gray-200 aspect-[16/10] rounded-lg overflow-hidden">
        <CarImage imageUrl={auction.imageUrl} />
        <div className="absolute left-2 bottom-2">
          <CountdownTimer auctionEnd={auction.auctionEnd} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-700">
          {auction.make} {auction.model} {auction.color}
        </div>
        <div className="font-semibold text-sm">{auction.year}</div>
      </div>
    </a>
  );
}
