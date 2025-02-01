import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

        <Route path="/events" element={<Event />}></Route>
        <Route path="/newsletter" element={<NewsletterPage />}></Route>
        <Route path="/updates" element={<UpdatesPage />}></Route>

        <Route path="/community" element={<Community />}></Route>

        <Route path="/chat" element={<ChatPage />}></Route>

        <Route path="/profile" element={<Profile />} />
        <Route path="/memories" element={<MemoriesPage />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
