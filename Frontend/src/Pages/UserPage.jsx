import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { toast } from "react-toastify";
import BookCard from "../Components/BookCard";

function ProfilePage() {
  const params = useParams();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [books, setBooks] = useState([]);

  const notifyOnError = (msg) => {
    toast.error(msg);
  };

  const notifyOnSuccess = (msg) => toast.success(msg);

  useEffect(() => {
    const fetchUser = async () => {

      try{
        const res = await axios.get(`/users/${params.userName}`)
        const resData = res.data
        if(res.status === 200){
          setImage(resData.user.image);
          setName(resData.user.name);
          setUserName(resData.user.userName);
          setEmail(resData.user.email);
          setBooks(resData.books);
        }
      }
      catch(err){
        if(err.response && err.response.data && err.response.data.message){
        notifyOnError(err.response.data.message)
        console.log(err)
      }
    };
  }
    fetchUser();
  }, []);
  return (
    <div className="profile-page flex flex-col gap-12">
      <div className="user-profile bg-[#DBF1FF] py-8 flex flex-col gap-8 lg:flex-row lg:gap-36 justify-center items-center">
        <div className="user-img  flex flex-col gap-4 items-center">
          <img
            src={image}
            className="w-60 h-60 rounded-[50%] object-cover object-top p-2 ring-2 ring-gray-300 dark:ring-gray-500"
            alt=""
          />
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
          <div className="email flex gap-1 md:gap-8 bg-gray-200 p-3">
            <p className="font-medium w-24 sm:w-32">Email:</p>
            <p className="flex-grow text-left text-gray-600">{email}</p>
          </div>
        </div>
      </div>

      <div className="user-books flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Books added by User</h1>
        <div className="books-container flex flex-wrap justify-center gap-8 bg-[#DBF1FF] p-4 rounded-md xs:justify-start">
          {books.length > 0 ? (
            books.map((book) => {
              return <BookCard key={book._id} book={book} />;
            })
          ) : (
            <div className="text-lg">No books added yet</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
