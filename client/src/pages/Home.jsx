import React from 'react'
import HeroSection from '../components/HeroSection'
import NotableAlumni from '../components/NotableAlumni'
import About from '../components/About'
import Extra from '../components/Extra'
import { motion } from "framer-motion";
import Community from './Community'
import Testimonials from '../components/Testimonial'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <NotableAlumni/>
      <About/>
      <Extra/>
      <Testimonials/>
      
    </div>
  )
}

export default Home
