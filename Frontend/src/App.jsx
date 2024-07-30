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
import { LoginContext } from './context/LoginContext';
import Modal from './Components/Modal';
import EachBook from './Pages/EachBook';
import UserPage from "./Pages/UserPage"


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <LoginContext.Provider value={{loggedIn, setLoggedIn, modalOpen, setModalOpen}}>
    <div className='app p-4 md:px-8 bg-[#C1E7FF] h-screen'>
      <Header />
      <Routes>
        <Route path='/' Component={Hero} />
        <Route path='/books' Component={Books} />
        <Route path='/signup' Component={SignUp} />
        <Route path='/login' Component={LogIn} />
        <Route exact path='/profile' Component={ProfilePage} />
        <Route path='/categories' Component={UserPage} />
        <Route path='/profile/addbook' Component={AddBook} />
        <Route path='/books/:bookId' Component={EachBook} />
        <Route path='/users/:userName' Component={UserPage} />
      </Routes>
      <ToastContainer theme='dark'/>
      {modalOpen && <Modal />}
    </div>
    </LoginContext.Provider>
  )
}

export default App