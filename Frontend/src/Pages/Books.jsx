import React, { useState, useEffect } from "react";
import BookCard from "../Components/BookCard";
import SearchBar from "../Components/SearchBar";

function Books() {
  const [books, setBooks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("https://bookish-insights-production.up.railway.app/books", {
          method: "get",
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setBooks(data);
        } else {
          console.log("Expected array but received: ", data);
          setBooks([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);

  const handleSearchChange = (keyword) => {
    setSearchKeyword(keyword);
  };
  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      book.author.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      book.category.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  return (
    <div>
      <SearchBar
        searchKeyword={searchKeyword}
        handleSearchChange={handleSearchChange}
      />

      <div className="books-container flex flex-wrap justify-center gap-8 bg-[#DBF1FF] p-4 rounded-md xs:justify-start">
        {filteredBooks.length === 0 ? (
          <p className="text-lg font-medium">No books found</p>
        ) : (
          filteredBooks.map((book) => {
            return <BookCard key={book._id} book={book} />;
          })
        )}
      </div>
    </div>
  );
}

export default Books;
