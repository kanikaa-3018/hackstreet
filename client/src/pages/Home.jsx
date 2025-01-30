import React from 'react'
import HeroSection from '../components/HeroSection'
import NotableAlumni from '../components/NotableAlumni'
import About from '../components/About'
import Extra from '../components/Extra'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <NotableAlumni/>
      <About/>
      <Extra/>
    </div>
  )
}

export default Home
