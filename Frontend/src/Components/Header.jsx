import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
function toggleMobileMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");
}
function Header() {
  const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  //The problem with defining the state in this file is that it will not be accessible outside of the Header component.
  //And whenever the user is logged in successfully the header component will not know whether the user is logged in or not so the
  //navbar will not be displayed accordingly

  //useContext to get login state and modal state
  const { loggedIn, setModalOpen } = useContext(Context);
  //Getting token from local storage
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const thumbnailImgUrl = user.image.replace("/upload", "/upload/w_60,h_60,c_fill,g_north/") 

  //useEffect to redirect to login page if user is not signed in
  useEffect(() => {
    if (!token && !loggedIn) {
      navigate("/login");
    }
  }, []);
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
          {token || loggedIn ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/books">Books</Link>
              </li>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
              <li>
                <Link to="/profile">
                  <img
                    className="w-10 h-10  rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover object-top"
                    src={thumbnailImgUrl}
                    alt="Bordered avatar"
                  />
                </Link>
              </li>
              <li>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => setModalOpen(true)}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
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
