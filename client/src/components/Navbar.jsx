import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo iiitm 1.png";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuMessageSquareText } from "react-icons/lu";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className="w-full flex flex-col gap-4 pt-4 sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-12 w-full">
        <div className="">
          <h1 className="font-extrabold text-3xl heading">ALUMNI NEXUS</h1>
          <p className="pl-8">a digital hub for</p>
          <p className="pl-16">ALUMNI Networking...</p>
        </div>
        <div className="">
          <img src={logo} alt="Logo" className="w-20 h-auto" />
        </div>
        <div className="flex gap-2 justify-center">
          <p>Let's Connect</p>
          <div className="flex justify-center items-center gap-2">
            <FaInstagram />
            <FaLinkedin />
            <FaFacebook />
          </div>
        </div>
      </div>

      {/* Navbar Links */}
      <div className="bg-[#00016A] text-white p-4 flex gap-8 w-full items-center px-16">
        <button className="-ml-8" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <GiHamburgerMenu />
        </button>
        <Link to="/" className="hover:underline font-semibold">
          Home
        </Link>
        <Link to="/events" className="hover:underline font-semibold">
          Events
        </Link>
        <Link to="/about" className="hover:underline font-semibold">
          About
        </Link>
        <Link to="/updates" className="hover:underline font-semibold">
          Updates
        </Link>
        <Link to="/newsletter" className="hover:underline font-semibold">
          Newsletter
        </Link>
        <div className="ml-auto -mr-8">
          <LuMessageSquareText />
        </div>
      </div>

      {/* Sidebar Toggle */}
      {isSidebarOpen && <Sidebar />}
    </nav>
  );
};

export default Navbar;
