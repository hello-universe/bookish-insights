import React from "react";

function SearchBar({ searchKeyword, handleSearchChange }) {
  return (
    <div className="relative flex gap-2 mb-6 md:mb-10 shadow-md lg:w-1/2 lg:mx-auto">
      <input
        type="search"
        className="relative m-0 -me-0.5 block flex-auto rounded-md border border-solid border-gray-300 bg-[#ececec] bg-clip-padding px-3 py-2 text-base font-normal  leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-[#0D6EFC]"
        placeholder="Search a book"
        value={searchKeyword}
        onChange={(event) => handleSearchChange(event.target.value)}
      />
      <button
        className="z-[2] inline-block rounded border-2 border-[#0D6EFC] px-5 pb-[5px] pt-2 text-md font-medium uppercase leading-normal text-[#0D6EFC] transition duration-300 ease-in-out hover:text-white hover:bg-[#0D6EFC]"
        data-twe-ripple-init
        data-twe-ripple-color="white"
        type="button"
        id="button-addon3"
        // onClick={handleSearchChange}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
