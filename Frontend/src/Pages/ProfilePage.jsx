import React from "react";
import profile_img from "../assets/profile_photo.jpg";
import Books from "./Books";
import { Link } from "react-router-dom";

function ProfilePage() {
  return (
    <div className="profile-page flex flex-col gap-12">
      <div className="user-profile bg-[#DBF1FF] py-8 flex flex-col gap-8 lg:flex-row lg:gap-36 justify-center items-center">
        <div className="user-img  flex flex-col gap-4 items-center">
          <img src={profile_img} className="w-60 h-60 rounded-[50%]" alt="" />
          <a href="" className="text-[#13537d] underline">
            Change
          </a>
        </div>
        <div className="user-info text-2xl flex flex-col gap-5">
          <div className="user-name flex gap-10">
            <p className="w-36 ">Username:</p>
            <p className="flex-grow text-left">amitverma1722</p>
          </div>
          <div className="name flex gap-10">
            <p className="w-36">Name:</p>
            <p className="flex-grow text-left">Amit Verma</p>
          </div>
          <div className="email flex gap-10">
            <p className="w-36">Email:</p>
            <p className="flex-grow text-left">amitverma@gmail.com</p>
          </div>
          <Link to='/profile/addbook'>
          <button className="px-3 py-1 bg-[#d43e48] text-white rounded self-start">
            Add a Book
          </button>
          </Link>
          
        </div>
      </div>

      <div className="user-books flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Your Books</h1>
        <Books />
      </div>
    </div>
  );
}

export default ProfilePage;
