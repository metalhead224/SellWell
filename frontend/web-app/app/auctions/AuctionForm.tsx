"use client";

import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/Input";
import DateInput from "../components/DateInput";
import { createAuction, updateAuction } from "../actions/auctionsAction";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Auction } from "../../types/Index";

type Props = {
  auction?: Auction;
};

export default function AuctionForm({ auction }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    control,
    reset,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    if (auction) {
      const { make, model, year, color, mileage } = auction;
      reset({ make, model, year, color, mileage });
    }
    setFocus("make");
  }, [setFocus]);

  async function onSubmit(data: FieldValues) {
    let id = "";
    let res;
    try {
      if (pathname === "/auctions/create") {
        res = await createAuction(data);
        id = res.id;
      } else {
        if (auction) {
          await updateAuction(data, auction.id);
          id = auction.id;
          router.push(`/auctions/details/${auction.id}`);
        }
      }
      if (res.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${res.id}`);
    } catch (error: any) {
      toast.error(error.status + " " + error.message);
    }
  }

  function handleCancel() {
    if (auction) {
      router.push(`/auctions/details/${auction.id}`);
    } else {
      router.push('/')
    }
  }

  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Make"
        name="make"
        control={control}
        rules={{ required: "Make is required" }}
      />
      <Input
        label="Model"
        name="model"
        control={control}
        rules={{ required: "Model is required" }}
      />
      <Input
        label="Color"
        name="color"
        control={control}
        rules={{ required: "Color is required" }}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Year"
          name="year"
          control={control}
          type="number"
          rules={{ required: "Year is required" }}
        />
        <Input
          label="Mileage"
          name="mileage"
          control={control}
          type="number"
          rules={{ required: "Mileage is required" }}
        />
      </div>

      {pathname === "/auctions/create" && (
        <>
          <Input
            label="Image URL"
            name="imageUrl"
            control={control}
            rules={{ required: "Image URL is required" }}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Reserve Price"
              name="reservePrice"
              control={control}
              type="number"
              rules={{ required: "Reserve Price is required" }}
            />
            <DateInput
              label="Auction end date/time"
              name="auctionEnd"
              dateFormat="dd MMMM yyyy h:mm a"
              showTimeSelect
              control={control}
              type="date"
              rules={{ required: "Auction end date is required" }}
            />
          </div>
        </>
      )}

      <div className="flex justify-between">
        <Button outline color="gray" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          color="success"
          isProcessing={isSubmitting}
          disabled={!isValid}
          type="submit"
          outline
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
