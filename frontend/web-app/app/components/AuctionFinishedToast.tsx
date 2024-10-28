import React from "react";
import { Auction, AuctionFinished } from "../types/Index";
import Link from "next/link";
import Image from "next/image";
import { numberWithCommas } from "../util/numberWithCommas";

type Props = {
  finishedAuction: AuctionFinished;
  auction: Auction;
};

export default function AuctionFinishedToast({
  auction,
  finishedAuction,
}: Props) {
  return (
    <Link
      href={`/auctions/details/${auction.id}`}
      className="flex flex-col items-center"
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          src={auction.imageUrl}
          alt="Image of car"
          height={80}
          width={80}
          className="rounded-lg w-auto h-auto"
        />
        <div className="flex flex-col">
          <span>
            Auction finished! {auction.make} {auction.model} has been added
          </span>
          {finishedAuction.itemSold && finishedAuction.amount ? (
            <p>Congrats to {finishedAuction.winner} who has won the auction for 
                ${numberWithCommas(finishedAuction.amount)}</p>
          ) : (
            <p>Item did not sell.</p>
          )}
        </div>
      </div>
    </Link>
  );
}