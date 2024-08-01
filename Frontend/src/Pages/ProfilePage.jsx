import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import BookCard from "../Components/BookCard";
import { Context } from "../context/Context";

function ProfilePage() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [books, setBooks] = useState([]);

  const { setProfilePicModal } = useContext(Context);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/profile", {
          method: "get",
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        if (res.ok) {
          setImage(data.user.image);
          setName(data.user.name);
          setUserName(data.user.userName);
          setEmail(data.user.email);
          setBooks(data.books);
        }
        // console.log(data);
      } catch (err) {
        console.log(err);
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
        <div className="user-info text-2xl flex flex-col gap-5">
          <div className="user-name flex gap-10">
            <p className="w-36 ">Username:</p>
            <p className="flex-grow text-left">{userName}</p>
          </div>
          <div className="name flex gap-10">
            <p className="w-36">Name:</p>
            <p className="flex-grow text-left">{name}</p>
          </div>
          <div className="email flex gap-10">
            <p className="w-36">Email:</p>
            <p className="flex-grow text-left">{email}</p>
          </div>
          <Link to="/profile/addbook">
            <button className="px-3 py-1 bg-[#d43e48] text-white rounded self-start">
              Add a Book
            </button>
          </Link>
        </div>
      </div>

      <div className="user-books flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Your Books</h1>
        <div className="books-container flex flex-wrap gap-8 bg-[#DBF1FF] p-4 rounded-md">
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
