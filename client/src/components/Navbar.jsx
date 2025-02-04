import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logo iiitm 1.png";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuMessageSquareText } from "react-icons/lu";
import Sidebar from "./Sidebar";

import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { user, setUser } = useUser();
  console.log(user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear user from localStorage
    setUser(null); // Clear user context
    navigate("/Login"); // Redirect to home
  };
  const firstLetter = user?.alumni?.name?.charAt(0).toUpperCase() || "";

  useEffect(() => {
    navigate("/");
    }
  , [user]);

  return (
    <nav className="w-full flex flex-col gap-4 pt-4 sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-12 w-full">
        <Link to='/'>
          <div>
            <h1 className="font-extrabold text-3xl heading">ALUMNI NEXUS</h1>
            <p className="pl-8">a digital hub for</p>
            <p className="pl-16">ALUMNI Networking...</p>
          </div>
        </Link>
        <div>
          <img src={logo} alt="Logo" className="w-20 h-auto" />
        </div>
        <div className="flex gap-2 justify-center">
          <p>Let's Connect</p>
          <div className="flex justify-center items-center gap-2">
            <Link to="https://www.instagram.com/iiitmgwaliorofficial/reels/" target="_blank"><FaInstagram /></Link>
            <Link to="https://www.linkedin.com/school/abv-indian-institute-of-information-technology-and-management/posts/?feedView=all" target="_blank"><FaLinkedin /></Link>
            <Link to="https://www.facebook.com/iiitm/" target="_blank"><FaFacebook /></Link>
          </div>
        </div>
      </div>

{/*nav */}
      <div className="bg-[#00016A] text-white p-4 flex items-center px-8 justify-between w-full">
      
      <div className="flex items-center gap-5">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <GiHamburgerMenu />
        </button>
        <Link to="/" className="hover:underline font-semibold">Home</Link>
        <Link to="/events" className="hover:underline font-semibold">Events</Link>
        <Link to="/updates" className="hover:underline font-semibold">Updates</Link>
        <Link to="/newsletter" className="hover:underline font-semibold">Newsletter</Link>
        <Link to="/community" className="hover:underline font-semibold">Community</Link>
      </div>

      <div className="flex items-center gap-6">
        {!user ? (
          <Link to="/login" className="cursor-pointer hover:underline font-semibold">
            Login
          </Link>
        ) : (
          <div className="flex gap-4 items-center">
            <Link to="/profile" className="cursor-pointer hover:underline font-semibold">
              <div className="w-8 h-8 flex items-center justify-center bg-white text-[#00016A] font-bold rounded-full border">
                {firstLetter}
              </div>
            </Link>
            <button onClick={handleLogout} className="cursor-pointer hover:underline font-semibold">
              Logout
            </button>
          </div>
        )}

        {/* Chat Icon */}
        <div className="cursor-pointer">
          <LuMessageSquareText onClick={() => navigate("/chat")} />
        </div>
      </div>

      {isSidebarOpen && <Sidebar />}
    </div>
    </nav>
  );
};

export default Navbar;