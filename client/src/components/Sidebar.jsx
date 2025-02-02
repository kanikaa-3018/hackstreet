import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import axios from "axios";

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  // Click outside detection to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allAlumniRes = await axios.get("http://localhost:4000/api/v1/alumni/get-all");
        const friendsRes = await axios.get("http://localhost:4000/api/v1/alumni/connections", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (allAlumniRes.data.success && Array.isArray(allAlumniRes.data.alumni)) {
          setUsers(allAlumniRes.data.alumni);
        }

        if (friendsRes.data.connections) {
          setFriends(friendsRes.data.connections.map((friend) => friend._id));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const connectAlumni = async (alumniId) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/alumni/connect",
        { alumniId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setFriends((prevFriends) => [...prevFriends, alumniId]);
      } else {
        console.error("Failed to connect:", response.data.message);
      }
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  const disconnectAlumni = async (alumniId) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/alumni/disconnect",
        { alumniId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setFriends((prevFriends) => prevFriends.filter((id) => id !== alumniId));
      } else {
        console.error("Failed to disconnect:", response.data.message);
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  const toggleConnection = (alumniId) => {
    if (friends.includes(alumniId)) {
      disconnectAlumni(alumniId);
    } else {
      connectAlumni(alumniId);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(value.length > 0);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleUserClick = (userId) => {
    if (!userId) {
      console.error("No userId provided");
      return;
    }
    navigate(`/profile/${userId}`);
    setShowDropdown(false);
  };

  return (
    <div ref={sidebarRef} className={`fixed left-0 top-[180px] w-80 h-full bg-gray-100 text-gray-800 shadow-lg p-4 transition-transform duration-600 overflow-y-auto ${isSidebarOpen ? "" : "transform -translate-x-full"}`}>
      <h2 className="text-xl font-semibold mb-6 pb-2 px-4 border-b-2 border-gray-400">Dashboard</h2>

      {/* Search Bar */}
      <div className="relative">
        <div className="w-full flex items-center gap-2 bg-white text-gray-800 h-10 px-4 rounded-full border border-gray-300 focus-within:ring-2">
          <MdSearch className="text-gray-600 text-xl" />
          <input 
            type="text" 
            placeholder="Search your peers here..." 
            className="bg-transparent text-sm w-full focus:outline-none" 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
