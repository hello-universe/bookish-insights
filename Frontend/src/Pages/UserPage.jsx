import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import BookCard from "../Components/BookCard";

function ProfilePage() {
    const params = useParams()

    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [books, setBooks] = useState([])

    useEffect(()=>{
        const fetchUser = async () =>{
            try{
                const res = await fetch(`http://localhost:8000/users/${params.userName}`)
                const data = await res.json()
                console.log(data)
                if(res.ok){
                    setImage(data.user.image)
                    setName(data.user.name)
                    setUserName(data.user.userName)
                    setEmail(data.user.email)
                    setBooks(data.books)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        fetchUser()
    }, [])
  return (
    <div className="profile-page flex flex-col gap-12">
      <div className="user-profile bg-[#DBF1FF] py-8 flex flex-col gap-8 lg:flex-row lg:gap-36 justify-center items-center">
        <div className="user-img  flex flex-col gap-4 items-center">
          <img src={image} className="w-60 h-60 rounded-[50%] p-2 ring-2 ring-gray-300 dark:ring-gray-500" alt="" />
        </div>
        <div className="user-info text-2xl flex flex-col gap-5">
          <div className="user-name flex gap-10">
            <p className="w-36 ">Username:</p>
            <p className="flex-grow text-left">{userName}</p>
          </div>
          <div className="name flex gap-10">
            <p className="w-36">Name:</p>
            <p className="flex-grow text-left">{name}</p>
          </div>
          <div className="email flex gap-10">
            <p className="w-36">Email:</p>
            <p className="flex-grow text-left">{email}</p>
          </div>
          
        </div>
      </div>

      <div className="user-books flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Books added by User</h1>
        <div className="books-container flex flex-wrap gap-8 bg-[#DBF1FF] p-4 rounded-md">
            {books.map((book)=>{
                return <BookCard key={book._id} book={book}/>
            })}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
