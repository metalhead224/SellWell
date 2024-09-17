import React from 'react'
import Search from './Search';
import Logo from './Logo';


export default function Navbar() {
  return (
    <header className='sticky top-0 z-50 flex justify-between p-5 font-gray-800 shadow-md items-center'>
        <Logo />
        <Search />
        <div>Login</div>
    </header>
  )
}
