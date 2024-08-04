import React, {createContext, useState} from 'react'
import Header from './Components/Header'
import Hero from './Components/Hero'
import { Route, Routes } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Books from './Pages/Books'
import SignUp from './Pages/SignUp'
import LogIn from './Pages/LogIn';
import ProfilePage from './Pages/ProfilePage';
import AddBook from './Components/AddBook';
import { Context } from './context/Context';
import Modal from './Components/Modal';
import EachBook from './Pages/EachBook';
import UserPage from "./Pages/UserPage"
import ProfilePic from './Components/ProfilePic';
import Navbar from './Components/Navbar';
import CategoryBooks from './Pages/CategoryBooks';



function App() {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [profilePicModal, setProfilePicModal] = useState(false);
  return (
    <Context.Provider value={{modalOpen, setModalOpen, profilePicModal, setProfilePicModal}}>
    <div className='app p-4 md:px-8 bg-[#a7edff] min-h-screen'>
      <Header />
      <Routes>
        <Route path='/' Component={Hero} />
        <Route path='/books' Component={Books} />
        <Route path='/signup' Component={SignUp} />
        <Route path='/login' Component={LogIn} />
        <Route exact path='/profile' Component={ProfilePage} />
        <Route path='/categories' Component={Navbar} />
        <Route path='/profile/addbook' Component={AddBook} />
        <Route path='/books/:bookId' Component={EachBook} />
        <Route path='/books/category/:category' Component={CategoryBooks} />
        <Route path='/users/:userName' Component={UserPage} />
      </Routes>
      <ToastContainer theme='dark'/>
      {modalOpen && <Modal />}
      {profilePicModal && <ProfilePic />}
    </div>
    </Context.Provider>
  )
}

export default App