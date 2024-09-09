'use client'

import React, { useEffect, useState } from "react";
import AuctionsCard from "./AuctionsCard";
import AppPagination from "../components/AppPagination";
import { Auction } from "../types/Index";
import { getData } from "../actions/auctionsAction";


export default function Listings() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getData(pageNumber).then(data => {
      setAuctions(data.results);
      setPageCount(data.pageCount);
    })
  }, [pageNumber])

  if (auctions.length === 0) return <h3>Loading...</h3>

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        {auctions &&
          auctions.map((auction) => (
            <AuctionsCard auction={auction} key={auction.id} />
          ))}
      </div>
      <div className="flex justify-center mt-5">
        <AppPagination pageChanged={setPageNumber} currentPage={pageNumber} pageCount={pageCount} />
      </div>
    </>
  );
}
