import React from 'react'
import Header from './Components/Header'
import Hero from './Components/Hero'
import { Route, Routes } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Books from './Pages/Books'
import SignUp from './Pages/SignUp'
import LogIn from './Pages/LogIn';

function App() {
  return (
    <div className='app p-4 md:px-8 bg-[#C1E7FF] h-screen'>
      <Header />
      <Routes>
        <Route path='/' Component={Hero} />
        <Route path='/books' Component={Books} />
        <Route path='/signup' Component={SignUp} />
        <Route path='/login' Component={LogIn} />
      </Routes>
      <ToastContainer theme='dark'/>
    </div>
  )
}

export default App