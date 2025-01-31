import React from 'react'
import HeroSection from '../components/HeroSection'
import NotableAlumni from '../components/NotableAlumni'
import About from '../components/About'
import Extra from '../components/Extra'
import { motion } from "framer-motion";

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
