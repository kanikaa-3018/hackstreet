import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FaLinkedin, FaInstagram, FaBriefcase, FaUserPlus, FaUserMinus } from "react-icons/fa";
import { MapPin, GraduationCap } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const ProfilePerson = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // Track connection status

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.get(`http://localhost:4000/api/v1/alumni/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.alumni);

      // Check if the current user is connected to this alumni
      const loggedInUserId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
      setIsConnected(response.data.alumni.connections.includes(loggedInUserId));
    } catch (err) {
      console.error("Error fetching user:", err);
      setError(err.response?.data?.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      setError("Invalid user ID");
      setLoading(false);
      return;
    }
    fetchUserProfile();
  }, [userId]);

  // Handle adding a friend (Connecting)
  const handleAddFriend = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.post(
        "http://localhost:4000/api/v1/alumni/connect",
        { alumniId: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("User addded as connection")
      alert(response.data.message);
      setIsConnected(true);
    } catch (err) {
      console.error("Error sending friend request:", err);
      alert(err.response?.data?.message || "Failed to send friend request");
    }
  };

  
  const handleRemoveFriend = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.post(
        "http://localhost:4000/api/v1/alumni/disconnect",
        { alumniId: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("User removed as connection")
      alert(response.data.message);
      setIsConnected(false); 
    } catch (err) {
      console.error("Error removing friend:", err);
      alert(err.response?.data?.message || "Failed to remove friend");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        User not found
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden relative p-6">
        {/* Add/Remove Friend Button in Corner */}
        <button
          onClick={isConnected ? handleRemoveFriend : handleAddFriend}
          className={`absolute top-4 right-4 px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
            isConnected
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isConnected ? <FaUserMinus className="w-4 h-4" /> : <FaUserPlus className="w-4 h-4" />}
          {isConnected ? "Remove Friend" : "Add Friend"}
        </button>

        {/* Profile Image - Circular */}
        <div className="flex justify-center mt-4">
          <img
            src={user.profileImage || "/api/placeholder/300/300"}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
          />
        </div>

        {/* User Information */}
        <CardHeader className="text-center mt-4">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-600 mt-1 flex items-center justify-center">
            <FaBriefcase className="inline-block mr-2" />
            {user.position} at {user.company}
          </p>
          <p className="text-gray-600 mt-1 flex items-center justify-center">
            <MapPin className="inline-block mr-2" />
            {user.currentLocation}
          </p>
          <p className="text-gray-600 mt-1 flex items-center justify-center">
            <GraduationCap className="inline-block mr-2" />
            IIIT Gwalior | Batch of {user.year}
          </p>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          {/* Bio Section */}
          <p className="text-gray-700 text-center">{user.bio || "No bio available"}</p>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-6">
            {user.linkedin && (
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
              >
                <FaLinkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            )}
            {user.instagram && (
              <a
                href={user.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800 transition-colors flex items-center gap-2"
              >
                <FaInstagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePerson;
