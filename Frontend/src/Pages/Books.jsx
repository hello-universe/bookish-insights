import React from 'react'
import BookCard from '../Components/BookCard'
import all_books from "../assets/books";

function Books() {
  return (
    <div>
        <div className="books-container flex flex-wrap gap-8 bg-[#DBF1FF] p-4 rounded-md">
            {all_books.map((book)=>{
                return <BookCard key={book.id} book={book}/>
            })}
        </div>
    </div>
  )
}

export default Books