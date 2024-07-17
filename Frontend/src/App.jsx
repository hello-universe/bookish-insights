import React from 'react'
import Header from './Components/Header'
import Hero from './Components/Hero'
import { Route, Routes } from 'react-router-dom'
import Books from './Pages/Books'

function App() {
  return (
    <div className='app p-4 md:px-8 bg-[#C1E7FF] h-screen'>
      <Header />
      <Routes>
        <Route path='/' Component={Hero} />
        <Route path='/books' Component={Books} />
      </Routes>

    </div>
  )
}

export default App