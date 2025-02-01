import React from "react";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";

const Sidebar = () => {
  return (
    <div
      className="fixed left-0 top-[180px] w-64 h-full bg-gray-800 text-white shadow-lg p-4 
      transition-transform duration-600 scroll z-999 overflow-y-auto"
    >
      <h2 className="text-xl font-semibold mb-6 pb-2 px-4 border-b-2 border-gray-400">
        Dashboard
      </h2>

      {/* Search Bar */}
      <div className="w-full flex items-center gap-2 bg-gray-100/20 text-gray-200 h-10 px-4 rounded-full border border-gray-300 focus-within:ring-2 ">
        <MdSearch className="text-gray-100 text-xl" />
        <input
          type="text"
          placeholder="Search your peers here..."
          className="bg-transparent text-sm w-full focus:outline-none"
        />
      </div>

      
      <ul className="mt-4">
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/friends" className="block w-full h-full">My Friends</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/class-of-2024" className="block w-full h-full">Class of 2024</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/profile" className="block w-full h-full">My Profile</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/events" className="block w-full h-full">Events</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/settings" className="block w-full h-full">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
