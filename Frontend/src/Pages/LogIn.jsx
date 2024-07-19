import React, { useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import hero_img from '../assets/undraw_books_re_8gea.svg'

function LogIn() {
    //Use state for the state of either the password is visible or not
    const [visible, setVisible] = useState(false)
  return (
    <div className="login flex justify-evenly">
      <div className="bg-[#1E2936] w-80 rounded-md p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="password-wrap relative">
            <input
              type={visible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
             <button type="button" className="absolute right-2 top-[50%] translate-y-[-50%]" onClick={()=>setVisible(!visible)}>
            {visible ?  <VisibilityOffIcon className="text-[#1E2936]"/> : <VisibilityIcon className=" text-[#1E2936]"/>}
            </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#2463EA] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link to="/signup">
              <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Sign up
              </span>
            </Link>
          </p>
        </form>
      </div>

      <div className="hero-right hidden md:block">
            <img src={hero_img} alt="" />
        </div>
    </div>
  );
}

export default LogIn;