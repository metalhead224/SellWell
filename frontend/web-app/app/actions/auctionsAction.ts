'use server'

import { auth } from "@/auth";
import { PagedResult, Auction } from "../types/Index";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { FieldValues } from "react-hook-form";

export async function getData(query: string): Promise<PagedResult<Auction>> {
  return await fetchWrapper.get(`search${query}`);
}

export async function createAuction(data: FieldValues) {
  return await fetchWrapper.post('auctions', data);
}

export async function updateAuctionTest() {
  const data = {
    mileage: Math.floor(Math.random() * 10000) + 1
  }

  const session = await auth();

  const res = await fetch('http://localhost:6001/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + session?.accessToken
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) return {status: res.status, message: res.statusText}

  return res.statusText;
}