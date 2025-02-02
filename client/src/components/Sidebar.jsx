import React, { useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import axios from "axios";

const Sidebar = () => {
  const [users, setUsers] = useState([]); // All alumni
  const [friends, setFriends] = useState([]); // Connected alumni
  const [searchTerm,setSearchTerm]=useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate=useNavigate();

 
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
        
      }
    };

    fetchData();
  },[]);

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
        setFriends((prevFriends) => [...prevFriends, alumniId]); // Add to friends list
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
        setFriends((prevFriends) => prevFriends.filter((id) => id !== alumniId)); // Remove from friends list
      } else {
        console.error("Failed to disconnect:", response.data.message);
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };
  
  // Use the functions accordingly
  const toggleConnection = (alumniId) => {
    if (friends.includes(alumniId)) {
      disconnectAlumni(alumniId);
    } else {
      connectAlumni(alumniId);
    }
  };
  

  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(value.length > 0); 
  };

  
const handleUserClick = (userId) => {
  
  if (!userId) {
    console.error("No userId provided");
    return;
  }
  navigate(`/profile/${userId}`);
};
  

  return (
    <div className="fixed left-0 top-[180px] w-80 h-full bg-gray-100 text-gray-800 shadow-lg p-4 transition-transform duration-600 overflow-y-auto">
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
        {/* <p className="text-sm text-gray-500 mt-2">
  Showing {filteredUsers.length} results for "{searchTerm}"
</p> */}

      </div>
      {/*Dropdown Results */}
      {showDropdown && (
          <ul className="absolute left-0 top-12 w-full bg-white border border-gray-300 shadow-lg rounded-md max-h-60 overflow-y-auto z-50">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <li 
                  key={user._id} 
                  className="flex items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleUserClick(user._id)}
                >
                  <img
                    src={user.profileImage || "https://i.pinimg.com/236x/eb/8f/aa/eb8faa016a6b2e559d6b99541e1375c1.jpg"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-gray-400"
                  />
                  <span>{user.name}</span>
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No results found</li>
            )}
          </ul>
        )}
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
