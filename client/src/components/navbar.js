import React from "react";

const Navbar = () => {
  return (
    <header>
    <nav className="h-[80px] w-full bg-[#ffffff]  max-md:h-[60px] flex justify-center items-center px-4">
      <div className="w-[80%] flex justify-between items-center ">
      <div className="flex items-center">
        {/* <img src="ssaver-logo.png" alt="SSsaver Logo" className="h-8 w-8 mr-2" /> */}
        <span className="text-[#302703] font-bold">SSsaver</span>
      </div>
      <div className="flex w-[30%] justify-around">
        <a href="/" className="text-[#302703] mr-4">About</a>
        <a href="/" className="text-[#302703]">Contact</a>
      </div>
      </div>
    </nav>
  </header>
  );
};

export default Navbar;
