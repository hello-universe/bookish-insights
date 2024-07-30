import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function EachBook() {
  const params = useParams();

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [addedBy, setAddedBy] = useState("");
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:8000/books/${params.bookId}`);
        const data = await res.json();
        // console.log(data)
        if (res.ok) {
          setName(data.name);
          setAuthor(data.author);
          setImage(data.image);
          setCategory(data.category);
          setRating(data.rating);
          setDescription(data.description);
          setAddedBy(data.addedBy.userName)
        }
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook()
  }, []);
  return (
    <div className="">
      <div className="container flex flex-col gap-10 w-full">
        <div className="info w-full flex flex-col gap-8 items-center md:items-start  md:flex-row">
          <div className="img-container w-48 mb-1 overflow-hidden flex items-center shadow-lg shadow-gray-700 justify-center md:w-1/4">
            <img src={image} className="w-full object-contain" alt="" />
          </div>
          <div className="other-info flex flex-col gap-5">
            <div className="name">
              <h3 className="text-xl font-medium mb-2">Name</h3>
              <p className="text-xl text-gray-600">{name}</p>
            </div>
            <div className="author">
              <h3 className="text-xl font-medium mb-2">Author</h3>
              <p className="text-xl text-gray-600">{author}</p>
            </div>
            <div className="category">
              <h3 className="text-xl font-medium mb-2">Category</h3>
              <p className="text-xl text-gray-600">{category}</p>
            </div>
            <div className="rating">
              <h3 className="text-xl font-medium mb-2">Rating</h3>
              <p className="text-xl text-gray-600">{rating}</p>
            </div>
            <div className="addedBy">
              <h3 className="text-xl font-medium mb-2">Added By</h3>
              <Link to={`/users/${addedBy}`} className="text-xl underline text-blue-600">{addedBy}</Link>
            </div>
          </div>
        </div>
        <div className="description">
          <h2 className="text-xl font-medium mb-2">Descrtiption</h2>
          <p className="text-lg text-gray-800">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default EachBook;
