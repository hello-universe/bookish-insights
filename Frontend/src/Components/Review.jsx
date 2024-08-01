import React, { useState } from "react";
const Review = ({ review }) => {
  const [isOpen, setIsOpen] = useState(false);
  const date = new Date(review.createdAt);
  const options = { day: "numeric", month: "short", year: "numeric" };

  // Format the date
  const formattedDate = date
    .toLocaleDateString("en-GB", options)
    .replace(",", "");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const thumbnailImgUrl = review.user.image.replace("/upload", "/upload/w_60,h_60,c_fill,g_north/") 
  return (
    <article className="p-6 mb-3 text-base border-t border-gray-200">
      <footer className="flex justify-between items-center mb-2 relative">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900">
            <img
              className="mr-2 w-6 h-6 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover object-top"
              src={thumbnailImgUrl}
              alt="User Profile pic"
            />
            {review.user.userName}
          </p>
          <p className="text-sm text-gray-600">
            <time>{formattedDate}</time>
          </p>
        </div>
        <button
          id="dropdownCommentButton"
          className="inline-flex items-center p-2 text-sm font-medium text-center text-black rounded-lg hover:bg-gray-100"
          type="button"
          onClick={toggleDropdown}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>
        {/* Dropdown menu */}
        <div
          id="dropdownComment"
          className={`${
            isOpen ? "visible" : "hidden"
          } z-10 w-36 rounded divide-y divide-gray-100 bg-white shadow absolute top-7 right-0`}
        >
          <ul
            className="py-1 text-sm text-gray-700"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                Edit
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                Remove
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                Report
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <p className="text-gray-700">{review.review}</p>
    </article>
  );
};

export default Review;
