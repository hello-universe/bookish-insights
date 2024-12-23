import React, { useEffect, useState, useContext } from "react";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import BookCard from "../Components/BookCard";
import { Context } from "../context/Context";

function ProfilePage() {
  const navigate = useNavigate()
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [books, setBooks] = useState([]);

  const { setProfilePicModal } = useContext(Context);

  useEffect(() => {
    const fetchProfile = async () => {

      try{
        const res = await axios.get("/profile", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          }
        })
        const resData = res.data;
        if(res.status !== 200){
          navigate("/login")
        }
        else{
          setImage(resData.user.image);
          setName(resData.user.name);
          setUserName(resData.user.userName);
          setEmail(resData.user.email);
          setBooks(resData.books);
        }
      }
      catch(err){
        console.log(err)
      }
    };
    fetchProfile();
  }, []);
  return (
    <div className="profile-page flex flex-col gap-12">
      <div className="user-profile bg-[#DBF1FF] py-8 flex flex-col gap-8 lg:flex-row lg:gap-36 justify-center items-center">
        <div className="user-img-section  flex flex-col gap-4 items-center">
          <div className="user-img w-60 h-60 rounded-[50%] overflow-hidden p-1 shadow-lg ring-2 ring-gray-400">
            <img
              src={image}
              className="w-full h-full rounded-[50%] object-cover object-top"
              alt=""
            />
          </div>
          <button
            href=""
            className="text-[#13537d] underline"
            onClick={() => setProfilePicModal(true)}
          >
            Change
          </button>
        </div>
        <div className="user-info text-sm flex flex-col sm:text-xl lg:text-2xl">
          <div className="user-name flex gap-1 md:gap-8 bg-gray-200 p-3">
            <p className="font-medium w-24 sm:w-32">Username:</p>
            <p className="flex-grow text-left text-gray-600">{userName}</p>
          </div>
          <div className="name flex gap-1 md:gap-8 p-3">
            <p className="font-medium w-24 sm:w-32">Name:</p>
            <p className="flex-grow text-left text-gray-600">{name}</p>
          </div>
          <div className="email flex gap-1 md:gap-8 bg-gray-200 p-3 mb-8">
            <p className="font-medium w-24 sm:w-32">Email:</p>
            <p className="flex-grow text-left text-gray-600">{email}</p>
          </div>
          <Link to="/profile/addbook">
            <button className="px-3 py-1 bg-red-600 text-white text-xl rounded self-start transition duration-300 ease-in-out hover:bg-red-700">
              Add a Book
            </button>
          </Link>
        </div>
      </div>

      <div className="user-books flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Your Books</h1>
        <div className="books-container flex flex-wrap justify-center gap-8 bg-[#DBF1FF] p-4 rounded-md xs:justify-start">
          {books.length > 0 ? (
            books.map((book) => {
              return <BookCard key={book._id} book={book} />;
            })
          ) : (
            <div className="text-lg">No books yet</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
