import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";

import PrivateRoute from "./components/PrivateRoute";

import Event from "./pages/Event";
import NewsletterPage from "./pages/Newsletter";
import UpdatesPage from "./pages/Update";

import Profile from "./pages/Profile";
import Community from "./pages/Community";
import MemoriesPage from "./pages/Memories";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chatbot from "./components/Chatbot";
import ChatPage from "./pages/ChatPage";
import HelpPage from "./components/Help";
import ReportPage from "./components/Report";


import ProfilePerson from "./pages/ProfilePerson";
import { ToastContainer, toast } from 'react-toastify';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div>
      <Chatbot />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="/events" element={<Event />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/updates" element={<UpdatesPage />} />
        <Route path="/memories" element={<MemoriesPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile/:userId" element={<ProfilePerson />} />


        <Route path="/events" element={<Event/>}></Route>
        <Route path="/newsletter" element={<NewsletterPage />}></Route>
        <Route path="/updates" element={<UpdatesPage/>}></Route>
        <Route path="/memories" element={<MemoriesPage/>}></Route>
        <Route path="/community" element={<Community/>}></Route>

        <Route path="/chat" element={<ChatPage />}></Route>


       
        <Route path="/profile/:userId" element={<ProfilePerson/>}/>
        {/* <Route path="/memories" element={<MemoriesPage />}></Route> */}

        
        <Route path="/memories" element={<MemoriesPage />}></Route>


      </Routes>
      
      <ScrollToTop />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
