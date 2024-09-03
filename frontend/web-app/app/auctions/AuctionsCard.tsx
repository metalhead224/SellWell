import Image from "next/image";
import React from "react";
import CountdownTimer from "./CountdownTimer";

type Props = {
  auction: any;
};

export default function AuctionsCard({ auction }: Props) {
  return (
    <a>
      <div className="relative w-full bg-gray-200 aspect-[16/10] rounded-lg overflow-hidden">
        <Image
          src={auction.imageUrl}
          alt={`Image of ${auction.make} ${auction.model} ${auction.color}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
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
