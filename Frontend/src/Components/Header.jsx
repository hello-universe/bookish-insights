import React, { useEffect, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

function Header() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const nav = useRef(null);
  const categories = [
    "Fiction",
    "Horror",
    "Romance",
    "Adventure",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Thriller",
    "Crime",
    "Non-Fiction",
    "Biography and Autobiography",
    "Self-Help",
    "Health and Wellness",
    "Travel",
    "Academic and Professional",
  ];

  const handleCategoryClick = (category) => {
    navigate(`/books/category/${category.toLowerCase()}`);
  };
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  //The problem with defining the state in this file is that it will not be accessible outside of the Header component.
  //And whenever the user is logged in successfully the header component will not know whether the user is logged in or not so the
  //navbar will not be displayed accordingly

  //useContext to get login state and modal state
  const { setModalOpen } = useContext(Context);
  //Getting token from local storage
  let token = localStorage.getItem("token");
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const res = await fetch("http://localhost:8000/user", {
          method: "get",
          headers: {
            "x-access-token": token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          await setUser(data.user);
        }
        // else{
        //   console.log(data.message)
        // }
      }
    };
    fetchUser();
  }, [token]);
  return (
    <nav className="border-gray-200 mb-4 md:mb-10 rounded-xl">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto py-4">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="logo w-10 h-10 rounded-[50%] bg-[#22577a] text-white text-xl flex items-center justify-center">
            B
          </div>
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Bookish Insights
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-800 rounded-lg md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => {
            nav.current.classList.toggle("hidden");
          }}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-default"
          ref={nav}
        >
          <ul className="font-medium text-lg flex flex-col gap-4 md:gap-8 p-4 md:p-0 md:items-center bg-[#8dd8ff] mt-4 border border-gray-100 rounded-lg md:bg-transparent md:flex-row lg:gap-16 lg:text-xl  rtl:space-x-reverse md:mt-0 md:border-0">
            {/* Home */}
            <li>
              <Link
                to={"/"}
                className="block py-2 px-3 text-gray-900 rounded md:bg-transparent transition duration-300 ease-in-out md:hover:text-blue-700 md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {/* Books */}
            <li>
              <Link
                to={"/books"}
                className="block py-2 px-3 text-gray-900 rounded transition duration-300 ease-in-out hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Books
              </Link>
            </li>
            {/* Category */}
            <li className="relative">
              <button
                className="block py-2 px-3 text-gray-900 rounded transition duration-300 ease-in-out hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                }}
              >
                Categories
              </button>
              {dropdownOpen ? (
                <div
                  id="dropdownNavbar"
                  className="z-10 absolute md:right-0 md:top-8 font-normal bg-[#1E2936] rounded-lg shadow w-60"
                >
                  <ul
                    className="py-2 text-lg text-white"
                    aria-labelledby="dropdownLargeButton"
                  >
                    {categories.map((category) => (
                      <li
                        key={category}
                        className="px-4 py-2 hover:bg-[#0f1317] cursor-pointer"
                        onClick={() => {
                          setDropdownOpen(false);
                          handleCategoryClick(category);
                        }}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <></>
              )}
            </li>
            {user ? (
              <>
                {/* Profile */}
                <li>
                  <Link
                    to={"/profile"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  >
                    <img
                      className="w-10 h-10 rounded-full ring-2 ring-gray-300 object-cover object-top transition duration-300 ease-in-out hover:ring-gray-500"
                      src={user.image.replace(
                        "/upload",
                        "/upload/w_60,h_60,c_fill,g_north/"
                      )}
                      alt="Bordered avatar"
                    />
                  </Link>
                </li>
                {/* Logout */}
                <li>
                  <a
                    href="#"
                    className="px-3 py-2 bg-red-600 text-white font-normal rounded transition duration-300 ease-in-out hover:bg-red-700"
                    onClick={() => setModalOpen(true)}
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                {/* Signup */}
                <li>
                  <Link to="/signup">
                    <button className="px-3.5 py-1.5 bg-[#22577a] text-white font-normal rounded transition duration-300 ease-in-out hover:bg-[#1d4967]">
                      Sign up
                    </button>
                  </Link>
                </li>
                <li>
                  {/* Login */}
                  <Link to="/login">
                    <button className="px-3.5 py-1.5 bg-[#22577a] text-white font-normal rounded transition duration-300 ease-in-out hover:bg-[#1d4967]">
                      Log In
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
