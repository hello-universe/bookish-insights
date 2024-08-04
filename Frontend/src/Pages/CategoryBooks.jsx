import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookCard from "../Components/BookCard";
import SearchBar from "../Components/SearchBar";

function CategoryBooks() {
  const params = useParams();
  const { category } = params;
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchChange = (keyword) => {
    setSearchKeyword(keyword);
  };
  useEffect(() => {
    const fetchCategoryBooks = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/books/category/${category}`,
          { method: "get" }
        );
        const data = await res.json();
        if (res.ok) {
          setCategoryBooks(data);
        } else {
          setCategoryBooks([]);
          console.log(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategoryBooks();
  }, [category]);

  const filteredBooks = categoryBooks.filter(
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
      <div className="books-container flex flex-wrap gap-8 bg-[#DBF1FF] p-4 rounded-md">
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

export default CategoryBooks;
