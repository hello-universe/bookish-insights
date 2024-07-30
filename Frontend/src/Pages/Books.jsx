import React, {useState, useEffect} from 'react'
import BookCard from '../Components/BookCard'

function Books() {
  const [books, setBooks] = useState([]);
  useEffect(()=>{
    const fetchBooks = async()=>{
      try{
        const res = await fetch("http://localhost:8000/books", {
          method: "get",
          headers:{
            "x-access-token": localStorage.getItem("token")
          }
        })
        const data = await res.json()
        if(res.ok && Array.isArray(data)){
          setBooks(data)
        }
        else{
          console.log("Expected array but received: ", data);
          setBooks([])
        }
      }
      catch(err){
        console.log(err)
      }
    }
    fetchBooks()
  }, [])
  return (
    <div>
        <div className="books-container flex flex-wrap gap-8 bg-[#DBF1FF] p-4 rounded-md">
            {books.map((book)=>{
                return <BookCard key={book._id} book={book}/>
            })}
        </div>
    </div>
  )
}

export default Books