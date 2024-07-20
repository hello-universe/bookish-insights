import React from 'react'
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

function App() {
  return (
    <div className='app p-4 md:px-8 bg-[#C1E7FF] h-screen'>
      <Header />
      <Routes>
        <Route path='/' Component={Hero} />
        <Route path='/books' Component={Books} />
        <Route path='/signup' Component={SignUp} />
        <Route path='/login' Component={LogIn} />
        <Route path='/profile' Component={ProfilePage} />
        <Route path='/profile/addbook' Component={AddBook} />
      </Routes>
      <ToastContainer theme='dark'/>
    </div>
  )
}

export default App