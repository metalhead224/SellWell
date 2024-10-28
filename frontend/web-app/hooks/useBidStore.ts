import { Bid } from "@/types/Index";
import { create } from "zustand";

type State = {
  bids: Bid[];
  open: Boolean;
};

type Actions = {
  setBids: (bids: Bid[]) => void;
  addBid: (bid: Bid) => void;
  setOpen: (value: Boolean) => void;
};

export const useBidStore = create<State & Actions>((set) => ({
  bids: [],
  open: true, //initial state

  setBids: (bids: Bid[]) => {
    set(() => ({
      bids,
    }));
  },

  addBid: (bid: Bid) => {
    set((state) => ({
      bids: !state.bids.find((x) => x.id === bid.id)
        ? [bid, ...state.bids]
        : [...state.bids], //adding after checking whether there is any duplicate bid
    }));
  },

  setOpen: (value: Boolean) => {
    set(() => ({
      open: value
    }))
  }
}));
