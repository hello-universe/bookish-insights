import React from "react";
import { Link } from "react-router-dom";
function toggleMobileMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");
}
function Header() {
  return (
    <div className="header flex relative justify-between items-center mb-8 md:mb-14">
      <a
        href="#"
        className="logo-holder flex items-center justify-center gap-2"
      >
        <div className="logo w-10 h-10 rounded-[50%] bg-[#22577a] text-white text-xl flex items-center justify-center">
          B
        </div>
        <div className="logo-text text-md font-semibold">Bookish Insights</div>
      </a>
      <nav>
        <ul
          id="menu"
          className="absolute right-0 top-8 text-lg hidden flex-col justify-center items-end gap-4 sm:flex sm:top-0 sm:flex-row sm:gap-16 sm:items-center"
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li>
            <a href="#categories">Categories</a>
          </li>
          <li>
            <Link to="/signup">
              <button className="px-3 py-1 bg-[#22577a] text-white rounded">
                Sign up
              </button>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <button className="px-3 py-1 bg-[#22577a] text-white rounded">
                Log In
              </button>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <button className="user-logo w-10 h-10 rounded-[50%] bg-purple-600 text-white text-xl flex justify-center items-center"></button>
            </Link>
          </li>
        </ul>
        <a
          href="#"
          className="mobile-toggle sm:hidden"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </a>
      </nav>
    </div>
  );
}

export default Header;
