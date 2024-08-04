import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Rating from "../Components/Rating";
import Review from "../Components/Review";

function EachBook() {
  const params = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [rated, setRated] = useState(undefined);
  const [userReview, setUserReview] = useState("");

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [averageRating, setAverageRating] = useState("");
  const [usersRated, setUsersRated] = useState(0);
  const [description, setDescription] = useState("");
  const [addedBy, setAddedBy] = useState("");
  const [reviews, setReviews] = useState([]);

  const notifyOnError = (msg) => {
    toast.error(msg);
  };

  const notifyOnSuccess = (msg) => toast.success(msg);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:8000/books/${params.bookId}`);
        const data = await res.json();
        if (res.ok) {
          setName(data.name);
          setAuthor(data.author);
          setImage(data.image);
          setCategory(data.category);
          setAverageRating(data.averageRating);
          setUsersRated(data.ratings.length);
          setDescription(data.description);
          setAddedBy(data.addedBy.userName);
          setReviews(data.reviews);
          //Check if user has already rated the book
          if (user) {
            const hasRated = data.ratings.find(
              (rating) => rating.user === user._id
            );
            setRated(hasRated);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook();
  }, []);

  // Handle rating submission
  const handleRate = async (rating) => {
    // console.log(`Rated with ${rating} stars`);
    // Handle the rating submission here, e.g., send it to the backend

    // Check if user is logged in
    // if (!user) {
    //   notifyOnError("Please login to rate this book.");
    //   navigate("/login");
    //   return;
    // }
    try {
      const res = await fetch(
        `http://localhost:8000/books/${params.bookId}/rate`,
        {
          method: "put",
          headers: {
            "x-access-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating: rating,
          }),
        }
      );
      const data = await res.json();
      // console.log(res);
      // console.log(data);
      //This condition arises when the either the token present in local storage is invalid or the user is not found
      if (res.ok) {
        notifyOnSuccess(data.message);
      } else {
        notifyOnError(data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      notifyOnError("Something went wrong. Please try again later.");
    }
  };

  // Handle review submission
  const handleReview = async () => {
    // Check if user is logged in
    // if (!user) {
    //   notifyOnError("Please login to give a review.");
    //   navigate("/login");
    //   return;
    // }
    try {
      const res = await fetch(
        `http://localhost:8000/books/${params.bookId}/review`,
        {
          method: "put",
          headers: {
            "x-access-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            review: userReview,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        notifyOnSuccess(data.message);
      } else {
        notifyOnError(data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container flex flex-col gap-10 w-full">
      <div className="info w-full flex flex-col gap-8 items-center md:items-start  md:flex-row">
        <div className="img-container w-48 mb-1 overflow-hidden flex items-center shadow-lg shadow-gray-700 justify-center md:w-1/4">
          <img src={image} className="w-full object-contain" alt="" />
        </div>
        <div className="other-info flex flex-col gap-5">
          <div className="name">
            <h3 className="text-xl font-medium mb-2">Name</h3>
            <p className="text-xl text-gray-600">{name}</p>
          </div>
          <div className="author">
            <h3 className="text-xl font-medium mb-2">Author</h3>
            <p className="text-xl text-gray-600">{author}</p>
          </div>
          <div className="category">
            <h3 className="text-xl font-medium mb-2">Category</h3>
            <p className="text-xl text-gray-600">{category}</p>
          </div>
          <div className="rating">
            <h3 className="text-xl font-medium mb-2">Rating</h3>
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
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
              <p className="text-xl font-medium text-gray-700">
                {averageRating} (Rated by {usersRated} users)
              </p>
            </div>
          </div>
          <div className="addedBy">
            <h3 className="text-xl font-medium mb-2">Added By</h3>
            <Link
              to={`/users/${addedBy}`}
              className="text-xl underline text-blue-600"
            >
              {addedBy}
            </Link>
          </div>
        </div>
      </div>
      <div className="description">
        <h2 className="text-xl font-medium mb-2">Descrtiption</h2>
        <p className="text-lg text-gray-800">{description}</p>
      </div>
      <div className="give-rating">
        <h2 className="text-2xl font-medium mb-2">
          Rate this book{" "}
          <span className="text-lg text-gray-600 font-normal">
            {rated ? "(You already rated with " + rated.rating + " stars)" : ""}
          </span>
        </h2>
        <Rating onRate={handleRate} />
      </div>

      {/* Reviews */}
      <div className="p-4 bg-[#d3f5ff] rounded-lg w-[calc(100vw-4rem)]">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-2">
          Reviews ({reviews.length})
        </h2>
        <form>
          <div className="w-full mb-4 border border-gray-200 rounded-lg">
            <div className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-400">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="4"
                className="w-full px-0 text-sm text-gray-900 bg-gray-100 border-0 focus:outline-none focus:ring-0"
                placeholder="Write your review..."
                required
                value={userReview}
                onChange={(event) => setUserReview(event.target.value)}
              ></textarea>
            </div>
            <div className="flex items-center justify-between py-2 border-t">
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                onClick={(e) => {
                  e.preventDefault();
                  handleReview();
                }}
              >
                Post Review
              </button>
            </div>
          </div>
        </form>
        {reviews.map((review) => {
          return <Review key={review._id} review={review} />;
        })}
      </div>
    </div>
  );
}

export default EachBook;
