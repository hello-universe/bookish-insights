import React from "react";
import AddIcon from "@mui/icons-material/Add";

function AddBook() {
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Author of Book"
                required=""
              />
            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="file_input"
              >
                Upload Cover Image
              </label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                id="file_input"
                type="file"
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
                defaultValue=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="TV">Fiction</option>
                <option value="PC">Horror</option>
                <option value="GA">Romance</option>
                <option value="PH">Adventure</option>
                <option value="PH">Science Fiction</option>
                <option value="PH">Fantasy</option>
                <option value="PH">Mystery</option>
                <option value="PH">Thriller</option>
                <option value="PH">Crime</option>
                <option value="PH">Non-Fiction</option>
                <option value="PH">Biography and Autobiography</option>
                <option value="PH">Self-Help</option>
                <option value="PH">Health and Wellness</option>
                <option value="PH">Travel</option>
                <option value="PH">Academic and Professional</option>
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
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
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
