import React from "react";
import { Link } from "react-router-dom";

function BookCard({book}) {
  return (
    <Link to={`/books/${book._id}`}>
    <div className=" w-44 h-auto bg-white rounded shadow-md cursor-pointer">
      <div className="card-container pb-3">
        <div className="img-container w-full h-52 mb-1 overflow-hidden flex items-center justify-center">
          <img src={book.image} className=" h-full object-contain" alt="" />
        </div>
        <div className="book-info px-2 flex flex-col gap-1">
          <div className="rating-container flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#FFC700"
              stroke="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-star"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <p className="rating text-sm">{book.averageRating}</p>
          </div>
          <p className="book-name text-sm leading-tight font-medium truncate-2-lines max-w-full hover:underline">
            {book.name}
          </p>
          <p className="author-name text-xs leading-none font-medium text-[#555555] truncate-2-lines">
            by {book.author}
          </p>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default BookCard;
