import React from "react";
import { MdSearch } from "react-icons/md";

const Sidebar = () => {
  return (
    <div
      className="fixed left-0 top-[180px] w-64 h-full bg-gray-800 text-white shadow-lg p-4 
      transition-transform duration-600 scroll z-999 overflow-y-auto"
    >
      <h2 className="text-xl font-semibold mb-6 pb-2 px-4 border-b-2 border-gray-400">Dashboard</h2>
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
          My Friends
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          Class of 2024
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          My Profile
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Events</li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
