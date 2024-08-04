import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import hero_img from '../assets/undraw_books_re_8gea.svg'

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  //Use state for the state of either the password is visible or not
  const [visible, setVisible] = useState(false)

  //useNavigate() function is used to navigate programmatically between different routes in a React application.
  const navigate = useNavigate();

  //Function to notify when there is an error while sign in
  const notifyOnError = (msg) => {
    toast.error(msg);
  };

  //Function to notify success
  const notifyOnSuccess = (msg) => toast.success(msg);

  //Regex to check for valid email
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  //Regex for strong password
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

  //Function to trigger when we click on create account

  const postData = async () => {
    //Checking for valid email using emailRegex
    if(!emailRegex.test(email)){
        notifyOnError("Please enter a valid email")
        return ;
    } //Checkinf for strong password using strongPasswordRegex
    else if(!strongPasswordRegex.test(password)){
        notifyOnError("Password must contain at least eight characters, including at least one number, one uppercase letter, one lowercase letter and also at least one special character.")
        return ;
    }
    const dataObj = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      userName: userName.trim(),
    };
    try {
      const res = await fetch("https://bookish-insights-production.up.railway.app/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj), //JSON.stringify() converts a JavaScript object or value to a JSON string.
      });
      const data = await res.json();
      //Checks if the response status is not in the range of 200-299, which indicates a successful request. If not, it throws an error.
      if (!res.ok) {
        notifyOnError(data.message);
        
      } else{
        navigate("/login"); 
        notifyOnSuccess(data.message);
      }
    } catch (err) {
      console.log("Problem with fetch operation: ", err);
    }
  };

  return (
    <div className="signup flex justify-evenly">
        
      <div className="w-96 bg-white dark:bg-[#1E2936] rounded-md p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label
              htmlFor="Name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="Name"
              id="Name"
              placeholder="Name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>
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
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email address"
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
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
            <button type="button" className="absolute right-2 top-[50%] translate-y-[-50%]" onClick={()=>setVisible(!visible)}>
            {visible ?  <VisibilityOffIcon className="text-[#1E2936]"/> : <VisibilityIcon className=" text-[#1E2936]"/>}
            </button>
            </div>

          </div>
          <div>
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              User Name
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="User Name"
              value={userName || ""}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              postData();
            }}
            className="w-full text-white bg-[#2463EA] hover:bg-[#22577a] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Create an account
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login">
              <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Login here
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

export default SignUp;
