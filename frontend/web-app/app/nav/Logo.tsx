'use client'

import { useParamsStore } from "@/hooks/useParamsStore";
import React from "react";
import { MdOutlineSell } from "react-icons/md";

export default function Logo() {
  const reset = useParamsStore((state) => state.reset);

  return (
    <div
        onClick={reset} 
        className="flex items-center gap-2 text-3xl font-semibold text-red-500 cursor-pointer">
      <MdOutlineSell size={34} />
      <div>Sell Well</div>
    </div>
  );
}
