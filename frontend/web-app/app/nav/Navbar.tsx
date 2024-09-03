import React from 'react'
import { MdOutlineSell } from "react-icons/md";


export default function Navbar() {
  return (
    <header className='sticky top-0 z-50 flex justify-between p-5 font-gray-800 shadow-md items-center'>
        <div className='flex items-center gap-2 text-3xl font-semibold text-red-500'>
            <MdOutlineSell size={34} />
            <div>Sell Well</div>
        </div>
        <div>Search</div>
        <div>Login</div>
    </header>
  )
}
