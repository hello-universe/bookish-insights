import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const categories = [
  "Horror",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Mystery",
];

function Header() {
  const navigate = useNavigate();
  const categoryDropdown = useRef(null)

  const handleCategoryClick = (category) => {
    navigate(`/books/category/${category.toLowerCase()}`);
  };

  return (
    <div className="header flex relative justify-between items-center mb-6 md:mb-10">
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
        <ul className="flex gap-8">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="relative">
            <button
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
              onClick={()=> categoryDropdown.current.classList.toggle("hidden")}
            >
              Category
            </button>

            <div
              id="dropdownNavbar"
              class="z-10 hidden absolute font-normal bg-[#1E2936] rounded-lg shadow w-44"
              ref={categoryDropdown}
            >
              <ul
                class="py-2 text-sm text-white"
                aria-labelledby="dropdownLargeButton"
              >
            {categories.map((category) => (
                  <li
                    key={category}
                    className="px-4 py-2 hover:bg-[#0f1317] cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
