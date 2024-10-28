"use client";

import { placeBidForAuction } from "@/app/actions/auctionsAction";
import { numberWithCommas } from "@/app/lib/numberWithCommas";
import { useBidStore } from "@/hooks/useBidStore";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  auctionId: string;
  highBid: number;
};

export default function BidForm({auctionId, highBid}: Props) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const { addBid } = useBidStore();


  function onSubmit(data: FieldValues) {
    if (data.amount <= highBid) {
        reset();
        return toast.error('Bid must be at least $' + numberWithCommas(highBid + 1));
    }

  // '+' sign is used to cast the amount to number because form typically submits string
    placeBidForAuction(auctionId, +data.amount).then(bid => {
        if (bid.error) throw bid.error;
        addBid(bid);
        reset();
    }).catch(err => {
        console.log(err);
        toast.error(err.message)
    })
}

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center border-2 rounded-lg py-2">
      <input
        type="number"
        {...register("amount")}
        className="input-custom text-sm text-gray-600"
        placeholder={`Enter your minimum bid $${numberWithCommas(highBid + 1)}`}
      />
    </form>
  );
}
