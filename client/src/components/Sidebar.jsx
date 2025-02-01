import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import axios from "axios";

const Sidebar = () => {
  const [users, setUsers] = useState([]); // All alumni
  const [friends, setFriends] = useState([]); // Connected alumni

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allAlumniRes = await axios.get("http://localhost:4000/api/v1/alumni/get-all");
        const friendsRes = await axios.get("http://localhost:4000/api/v1/alumni/connections", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (allAlumniRes.data.success && Array.isArray(allAlumniRes.data.alumni)) {
          setUsers(allAlumniRes.data.alumni);
          console.log(users)
        }

        if (friendsRes.data.connections) {
          setFriends(friendsRes.data.connections.map(friend => friend._id));
          console.log(friends)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setUsers([]);
        setFriends([]);
      }
    };

    fetchData();
  }, []);

  const toggleConnection = async (alumniId) => {
    try {
      const isConnected = friends.includes(alumniId);
      console.log(isConnected)
      const url = `http://localhost:4000/api/v1/alumni/${isConnected ? "disconnect" : "connect"}`;
      
      await axios.post(url, { alumniId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setFriends(prevFriends =>
        isConnected ? prevFriends.filter(id => id !== alumniId) : [...prevFriends, alumniId]
      );
    } catch (error) {
      console.error("Error updating connection:", error);
    }
  };

  return (
    <div className="fixed left-0 top-[180px] w-80 h-full bg-gray-100 text-gray-800 shadow-lg p-4 transition-transform duration-600 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6 pb-2 px-4 border-b-2 border-gray-400">Dashboard</h2>

      {/* Search Bar */}
      <div className="w-full flex items-center gap-2 bg-white text-gray-800 h-10 px-4 rounded-full border border-gray-300 focus-within:ring-2">
        <MdSearch className="text-gray-600 text-xl" />
        <input type="text" placeholder="Search your peers here..." className="bg-transparent text-sm w-full focus:outline-none" />
      </div>

      {/* Navigation */}
      <ul className="mt-4">
        <li className="hover:bg-gray-300 p-2 rounded cursor-pointer">
          <Link to="/class-of-2024" className="block w-full h-full">Class of 2024</Link>
        </li>
        <li className="hover:bg-gray-300 p-2 rounded cursor-pointer">
          <Link to="/profile" className="block w-full h-full">My Profile</Link>
        </li>
        <li className="hover:bg-gray-300 p-2 rounded cursor-pointer">
          <Link to="/events" className="block w-full h-full">Events</Link>
        </li>
        <li className="hover:bg-gray-300 p-2 rounded cursor-pointer">
          <Link to="/settings" className="block w-full h-full">Settings</Link>
        </li>
      </ul>

      {/* Friends Section */}
      <h3 className="mt-6 text-lg font-semibold">My Friends</h3>
      {friends.length === 0 ? (
        <p className="text-gray-500 text-sm mt-2">No friends yet. Start connecting!</p>
      ) : (
        <ul className="space-y-4 mt-2">
          {users.filter(user => friends.includes(user._id)).map(user => (
            <li key={user._id} className="p-3 bg-white rounded flex items-center gap-3 shadow">
              <img
                src={user.profileImage || "https://i.pinimg.com/236x/eb/8f/aa/eb8faa016a6b2e559d6b99541e1375c1.jpg"}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-500"
              />
              <div className="flex-1">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">Batch of {user.year || "N/A"}</p>
              </div>
              <button
                onClick={() => toggleConnection(user._id)}
                className="p-2 rounded-full border border-gray-400 hover:bg-gray-200 transition"
              >
                <FaUserCheck className="text-green-600" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* All Alumni Section */}
      <h3 className="mt-6 text-lg font-semibold">All Alumni</h3>
      <ul className="space-y-4 mt-2">
        {users.map(user => (
          <li key={user._id} className="p-3 bg-white rounded flex items-center gap-3 shadow">
            <img
              src={user.profileImage || "https://i.pinimg.com/236x/eb/8f/aa/eb8faa016a6b2e559d6b99541e1375c1.jpg"}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-500"
            />
            <div className="flex-1">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">Batch of {user.year || "N/A"}</p>
            </div>
            <button
              onClick={() => toggleConnection(user._id)}
              className="p-2 rounded-full border border-gray-400 hover:bg-gray-200 transition"
            >
              {friends.includes(user._id) ? <FaUserCheck className="text-green-600" /> : <FaUserPlus className="text-gray-600" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
