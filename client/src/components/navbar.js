import React from "react";

const Navbar = () => {
  return (
    <header>
      <nav className="flex h-[80px] w-full  items-center justify-center bg-gradient-to-r from-[#93dc99] to-[#46c38f] px-4 max-md:h-[60px]">
        <div className="flex w-[70%] items-center justify-between max-md:w-[90%]">
          <div className="flex items-center">
            {/* <img src="ssaver-logo.png" alt="SSsaver Logo" className="h-8 w-8 mr-2" /> */}
            <a href="/" className="text-4xl max-md:text-2xl font-extrabold text-[#302703]">
              SSsaver
            </a>
          </div>
          <div class="flex w-1/3 items-center justify-around">
            {/* <a
              href="/"
              class="mr-4 text-[#302703] hover:border-b hover:border-l-0 hover:border-r-0 hover:border-t-0 hover:border-white"
            >
              About
            </a> */}
            <a
              href="/contact"
              class="text-[#302703]  hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
