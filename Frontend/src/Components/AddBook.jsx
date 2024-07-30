import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

function AddBook() {
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const notifyOnError = (msg) => toast.error(msg);

  const notifyOnSuccess = (msg) => toast.success(msg);
  const postDetails = async () => {
    // console.log(name, author, image, category, description)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("author", author);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("description", description);

    try {
      const res = await fetch("http://localhost:8000/profile/addbook", {
        method: "post",
        body: formData,
        headers: {
          // "Content-Type": "multipart/form-data"
          "x-access-token": localStorage.getItem("token"),
        }
      });
      const resData = await res.json();
      if (!res.ok) {
        notifyOnError(resData.message);
      } else {
        notifyOnSuccess(resData.message);
        navigate("/profile")
      }
    } catch (err) {
      console.log("Error while sending data: ", err);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="lg:w-[50%] p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        {/* Modal header */}
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add Book
          </h3>
        </div>
        {/* Modal Body */}
        <form action="#">
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter Book name"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="author"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Author
              </label>
              <input
                type="text"
                name="author"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Author of Book"
                required=""
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload Cover Image
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                id="file_input"
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Fiction">Fiction</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
                <option value="Adventure">Adventure</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Thriller">Thriller</option>
                <option value="Crime">Crime</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Biography and Autobiography">
                  Biography and Autobiography
                </option>
                <option value="Self-Help">Self-Help</option>
                <option value="Health and Wellness">Health and Wellness</option>
                <option value="Travel">Travel</option>
                <option value="Academic and Professional">
                  Academic and Professional
                </option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write book description here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              postDetails();
            }}
            className="text-white inline-flex items-center bg-[#2463EA] hover:bg-[#22577a] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <AddIcon />
            Add new Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
