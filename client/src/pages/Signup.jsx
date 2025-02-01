import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logo iiitm 1.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    year: "",
    batch: "",
    phone: "",
    position: "",
    currentLocation: "",
    company: "",
    profileImage: null,
    instagram: "",
    linkedin: "",
    bio: "",
  });

  const navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const jsonData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      year: formData.year,
      batch: formData.batch,
      phone: formData.phone,
      position: formData.position,
      currentLocation: formData.currentLocation,
      company: formData.company,
      bio: formData.bio,
      linkedin: formData.linkedin,
      instagram: formData.instagram,
      profileImage: formData.profileImage ? formData.profileImage.name : null, // send file name if image is selected
    };

    console.log(jsonData); 

    try {
      console.log("Signup start");
      const response = await fetch("http://localhost:4000/api/v1/alumni/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(jsonData), // Send the JSON data
      });
      console.log("Signup end");
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error during signup");
      }

      const data = await response.json(); // Parse the JSON response
      console.log(data); 
      navigate("/login"); 
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed, please try again."); 

    }};
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-blue-100 p-6">
          <img src={logo} alt="College Logo" className="w-28 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 text-center mt-8">
            Join <br />
            <span className="heading text-2xl font-bold text-[#00016a]">
              ALUMNI NEXUS
            </span>
          </h2>
          <p className="text-gray-700 text-center mt-2 px-4">
            Connect with fellow alumni, grow your network, and share
            experiences!
          </p>
        </div>

        {/* Right Section - Signup Form */}
        <div className="w-1/2 p-8 overflow-y-auto max-h-[90vh]">
          <h2 className="text-3xl heading font-extrabold text-gray-700 mb-6 text-center capitalize border-b-2 pb-4">
            Sign Up
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-1">
                  Graduation Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Year"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-1">
                  Batch
                </label>
                <input
                  type="text"
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  placeholder="Batch"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-1">
                Current Position
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Your current role"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-1">
                Current Location
              </label>
              <input
                type="text"
                name="currentLocation"
                value={formData.currentLocation}
                onChange={handleChange}
                placeholder="City, Country"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-1">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-1">
                LinkedIn
              </label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn profile URL"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-1">
                Instagram
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="Instagram profile URL"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-1">
                Short Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-1">
                Profile Image
              </label>
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00016a] text-white py-2 rounded-lg hover:bg-blue-900 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Already have an account? */}
          <p className="text-sm text-gray-500 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;