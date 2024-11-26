import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axios";
import Rating from "../Components/Rating";
import Review from "../Components/Review";

function EachBook() {
  const params = useParams();
  const navigate = useNavigate();
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
        const res = await axios.get(`/books/${params.bookId}`);
        const data = res.data;
        if (res.status == 200) {
          setName(data.name);
          setAuthor(data.author);
          setImage(data.image);
          setCategory(data.category);
          setAverageRating(data.averageRating);
          setUsersRated(data.ratings.length);
          setDescription(data.description);
          setAddedBy(data.addedBy.userName);
          setReviews(data.reviews);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook();
  }, []);

  // Handle rating submission
  const handleRate = async (rating) => {
    try {
      //Format of axios.put
      //axios.put(url, data, config)
      const res = await axios.put(
        `/books/${params.bookId}/rate`,
        { rating }, // The payload for the request
        //Axios takes care of converting JavaScript objects into JSON strings for you. When you pass an object like { rating } to Axios,
        //it internally applies JSON.stringify() if the Content-Type header is application/json.
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      // Check the response and handle it
      if (res.status !== 200) {
        notifyOnError(res);
        navigate("/login");
      } else {
        notifyOnSuccess(res.data.message);
        location.reload();
      }
    //In axios if the request is not ok then it will throw an error and all the responses(like error messages sent from backend) will be
    //in the err object inside err.response.data
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        notifyOnError(err.response.data.message);
        if (err.response.status === 401) {
          navigate("/login"); // Redirect to login if unauthorized
        }
      } else {
        console.log(err);
        notifyOnError("Something went wrong. Please try again later.");
      }
    }
  };

  // Handle review submission
  const handleReview = async () => {
    try {
      const res = await axios.put(
        `/books/${params.bookId}/review`,
        {
          review: userReview.trim(), // Payload for the request
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(res); //Will not be printed because it will be handled by the catch block
      // Axios stores response data in `res.data`
      if (res.status === 200) {
        notifyOnSuccess(res.data.message);
        location.reload();
      } else {
        notifyOnError(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        notifyOnError(err.response.data.message);
        if (err.response.status === 401) {
          navigate("/login"); // Redirect to login if unauthorized
        }
      } else {
        console.log(err);
        notifyOnError("Something went wrong. Please try again later.");
      }
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
        <h2 className="text-2xl font-medium mb-2">Rate this book</h2>
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
