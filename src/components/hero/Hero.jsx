import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section id='hero' className='hero'>
      <div className="hero-top">
        <p>Witness the Apocalyptic scale of human destruction on Earth's ecosystems</p>
      </div>

      <div className="hero-bottom">
        <Link to={'/main'}>
          <button>Try now</button>
        </Link>
      </div>
    </section>
  )
}

export default Hero