
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import Footer from './components/Footer'
<<<<<<< HEAD
import PrivateRoute from './components/PrivateRoute'
=======
import Event from './pages/Event'
import NewsletterPage from './pages/Newsletter'
import UpdatesPage from './pages/Update'

>>>>>>> b190eed0b764ef3dcee5ab267c5d3b5168c3da83
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'


function App() {
  
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
<<<<<<< HEAD
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
=======

        <Route path='/events' element={<Event/>}></Route>
        <Route path='/newsletter' element={<NewsletterPage/>}></Route>
        <Route path='/updates' element={<UpdatesPage/>}></Route>

        <Route path='/profile' element={<Profile/>}/>

>>>>>>> b190eed0b764ef3dcee5ab267c5d3b5168c3da83
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
