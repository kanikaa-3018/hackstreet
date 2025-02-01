import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import Footer from './components/Footer'
import Event from './pages/Event'
import NewsletterPage from './pages/Newsletter'
import UpdatesPage from './pages/Update'

import Profile from './pages/Profile'
import Community from './pages/Community'
import MemoriesPage from './pages/Memories'




function App() {
  
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/events' element={<Event/>}></Route>
        <Route path='/newsletter' element={<NewsletterPage/>}></Route>
        <Route path='/updates' element={<UpdatesPage/>}></Route>
        <Route path='/community' element={<Community/>}></Route>

        <Route path='/profile' element={<Profile/>}/>
        <Route path='/memories' element={<MemoriesPage/>}></Route>

      </Routes>
      
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
