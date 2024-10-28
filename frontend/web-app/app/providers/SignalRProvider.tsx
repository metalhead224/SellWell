"use client";

import { useAuctionStore } from "@/hooks/useAuctionStore";
import { useBidStore } from "@/hooks/useBidStore";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useParams } from "next/navigation";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { Auction, AuctionFinished, Bid } from "../types/Index";
import { User } from "next-auth";
import toast from "react-hot-toast";
import AuctionCreatedToast from "../components/AuctionCreatedToast";
import { getDetailedViewData } from "../actions/auctionsAction";
import AuctionFinishedToast from "../components/AuctionFinishedToast";

type Props = {
  children: ReactNode;
  user: User | null
};

export default function SignalRProvider({ children, user }: Props) {
  const connection = useRef<HubConnection | null>();
  const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
  const addBid = useBidStore((state) => state.addBid);
  const params = useParams<{ id: string }>();

  /* Everytime react re-renders a page it automatically recreates all 
    of the function, if this behaviour is not wanted
    we use useCallBack hook
    ----THIS ENSURES THAT THE useEffect doesnot get executed again and again */

    const handleAuctionFinished = useCallback((finishedAuction: AuctionFinished) => {
      const auction = getDetailedViewData(finishedAuction.auctionId);
      return toast.promise(auction, {
        loading: 'Loading',
        success: (auction) => (
          <AuctionFinishedToast 
            finishedAuction={finishedAuction}
            auction={auction}
          />
        ),
        error: (err) => 'Auction Finished'
      }, {success: {duration: 10000, icon: null}})
    }, [])

    const handleAuctionCreated = useCallback((auction: Auction) => {
        if (user?.username !== auction.seller) {
            return toast(<AuctionCreatedToast auction={auction} />, {
                duration: 10000
            })
        }
    }, [user?.username])

    const handleBidPlaced = useCallback((bid: Bid) => {
        if (bid.bidStatus.includes('Accepted')) {
            setCurrentPrice(bid.auctionId, bid.amount);
        }

        if (params.id === bid.auctionId) {
            addBid(bid);
        }
    }, [setCurrentPrice, params.id, addBid])

  useEffect(() => {
    if (!connection.current) {
      //we need to use current in order to get the value inside useRef hook.
      connection.current = new HubConnectionBuilder()
        .withUrl("http://localhost:6001/notifications")
        .withAutomaticReconnect()
        .build();

      connection.current
        .start()
        .then(() => console.log("connected to notification hub"))
        .catch((err) => console.log(err));
    }

    connection.current.on("BidPlaced", handleBidPlaced);
    connection.current.on("AuctionCreated", handleAuctionCreated);
    connection.current.on("AuctionFinished", handleAuctionFinished);

    return () => { //clean up function after useEffect is dismounted, for eg: when the user moves to another auction
        connection.current?.off("BidPlaced", handleBidPlaced);
        connection.current?.off("AuctionCreated", handleAuctionCreated);
        connection.current?.off("AuctionFinished", handleAuctionFinished);
    }    
  }, [setCurrentPrice, handleBidPlaced, handleAuctionCreated, handleAuctionFinished]);

  return children;
}
