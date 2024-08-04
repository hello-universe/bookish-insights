import React from 'react'
import hero_img from '../assets/undraw_books_re_8gea.svg'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='flex flex-col gap-8 md:flex-row'>
        <div className="hero-left flex flex-col flex-1 gap-5 md:gap-8">
            <p className='text-[#4c4c4c] text-2xl font-normal'>
            Welcome to Bookish Insights!!<br />
            Our mission is to connect readers with insightful, honest, and engaging reviews that inspire and inform.<br />
            <span className='hidden md:inline-block'>
            Explore detailed reviews covering various genres, from fiction to non-fiction, classics to contemporary works.
            </span>

            </p>
            <Link to={"/books"} className='self-start p-2 rounded bg-[#22577a] font-medium text-white transition duration-300 ease-in-out hover:bg-[#1d4967]'>
                Explore books
            </Link>
        </div>
        <div className="hero-right flex-1">
            <img src={hero_img} alt="" />
        </div>
    </div>
  )
}

export default Hero