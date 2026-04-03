'use client'
import NavLinks, { BUTTONS } from "@/libs/constants";
import Link from "next/link";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className=" sticky top-0 z-50 bg-white border-b border-gray-500">
     <header className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between ">
       <Link href='/'>
        {/* <h1 className="header-logo md:text-3xl sm:text-2xl text-xl font-semibold cursor-pointer"> */}
        <h1 className="text-2xl font-bold">
          DevLaunch
        </h1>
      </Link>

      {/* Navbar */}
      <nav
        
        className='absolute top-3 hidden md:flex right-3 w-48 bg-gray-400 flex-col gap-6 py-5 px-2.5 rounded-lg text-xl transition-transform transform md:flex md:static md:flex-row md:gap-3 md:bg-transparent md:w-auto'
      >
        {NavLinks.map((navLink) => (
          <Link
          onClick={closeMenu}
            key={navLink.link}
            href={navLink.link}
            className="  text-gray-600 hover:scale-105 hover:underline hover:text-blue-600 transition-all duration-100 transform"
          >
            {navLink.title}
          </Link>
        ))}
      </nav>

      {/* Buttons */}
      <div className="header-buttons hidden md:flex md:gap-4 sm:gap-3 gap-2">
        <button className=" border border-gray-300 text-gray-800 px-1 md:px-5 sm:px-3 sm:py-2 py-1 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
          {BUTTONS.login}
        </button>
        <button className="bg-blue-600  text-white md:px-5 sm:px-3 px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200">
          {BUTTONS.getStarted}
        </button>
      </div>

      {/* Hamburger */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle navigation"
        className="hamburger-icon relative md:hidden text-2xl p-2"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>
      {/* Mobile menu */}
      <div className={`flex  md:px-8 sm:px-4 px-2 bg-gray-50 ${isMenuOpen?'h-[calc(100vh-4rem)] opacity-100' : 'h-0 opacity-0'}  transition-all duration-300 ease-in-out overflow-hidden  w-full  md:hidden absolute left-0 top-16 flex-col`}>
       <nav
  onClick={closeMenu}
  className='w-full flex flex-col gap-2 py-6 px-4'
>
  {NavLinks.map((navLink) => (
    <Link
      key={navLink.link}
      href={navLink.link}
      className="group w-max relative text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 text-lg font-medium"
    >
      {navLink.title}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
    </Link>
  ))}
</nav>
      <div className="header-buttons  items-center  sm:w-full flex gap-3 flex-col">
        <button className=" w-full sm:max-w-[50%]  border-gray-300 text-gray-800 px-1 md:px-5 sm:px-3 sm:py-2 py-1 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
          {BUTTONS.login}
        </button>
        <button className="bg-blue-600 sm:max-w-[50%] w-full text-white md:px-5 sm:px-3 px-1 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
          {BUTTONS.getStarted}
        </button>
      </div>

      </div>
     </header>
    </div>
  );
}

export default Header;