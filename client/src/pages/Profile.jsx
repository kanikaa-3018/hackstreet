import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaLinkedin, FaInstagram } from "react-icons/fa";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    image:
      "https://i.pinimg.com/474x/c9/d0/d4/c9d0d46374265dca2773bc3e0e85fa38.jpg",
    name: "John Doe",
    currentJob: "Software Engineer at Google",
    passingYear: "2020",
    college: "ABV-IIITM Gwalior",
    Email: "johndoe@example.com",
    Batch: "CSE",
    Phone: "+91 9876543210",
    CurrentLocation: "Bangalore, India",
    Position: "Software Engineer",
    Company: "Google",
    bio: "A passionate and results-driven software engineer with a strong background in full-stack development. Enthusiastic about building scalable web applications and leveraging emerging technologies to solve real-world problems. Skilled in JavaScript, React.js, Node.js, and cloud technologies, with experience working in dynamic, fast-paced environments. Always eager to collaborate with cross-functional teams to create innovative solutions. Believes in continuous learning, open-source contributions, and mentoring aspiring developers. Loves exploring new frameworks, optimizing code for performance, and sharing knowledge with the tech community.",
    linkedin: "https://linkedin.com/in/johndoe",
    instagram: "https://instagram.com/johndoe",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-xl mt-8 mb-12">
      <div className="flex items-center gap-6 border-b pb-4">
        <img
          src={profile.image}
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-gray-300 object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-600">{profile.currentJob}</p>
          <p className="text-sm text-gray-500">
            {profile.passingYear} • {profile.college}
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="ml-auto flex items-center bg-[#00016a] text-white px-6 py-1 rounded-sm hover:bg-blue-900 transition"
        >
          <MdEdit className="mr-2" /> {isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>

      <div className="mt-1 p-3 rounded-lg">
        {isEditing ? (
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring focus:ring-blue-300 mt-2"
          />
        ) : (
          <p className="text-gray-600 mt-2">{profile.bio}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {Object.entries(profile)
          .filter(
            ([key]) =>
              ![
                "image",
                "name",
                "currentJob",
                "passingYear",
                "college",
                "linkedin",
                "instagram",
                "bio",
              ].includes(key)
          )
          .map(([key, value]) => (
            <div
              key={key}
              className="p-3 bg-gray-100 rounded-lg border border-gray-300 shadow-sm hover:shadow-lg transition duration-300"
            >
              <label className="block font-semibold text-gray-700 hover:underline cursor-pointer">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg mt-1 focus:ring focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-700 mt-1 font-medium">{value}</p>
              )}
            </div>
          ))}
      </div>

      <div className="flex gap-6 mt-6">
        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline hover:text-blue-800 flex items-center gap-2"
          >
            <FaLinkedin /> LinkedIn
          </a>
        )}
        {profile.instagram && (
          <a
            href={profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:underline hover:text-pink-800 flex items-center gap-2"
          >
            <FaInstagram /> Instagram
          </a>
        )}
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-3">
          Latest Recruitment Opportunities
        </h2>
        <div className="space-y-3">
          {[
            {
              company: "Microsoft",
              role: "Software Engineer",
              location: "Hyderabad, India",
              skills: "React.js, Node.js",
            },
            {
              company: "Amazon",
              role: "Data Scientist",
              location: "Bangalore, India",
              skills: "Python, Machine Learning",
            },
            {
              company: "Flipkart",
              role: "Backend Developer",
              location: "Remote",
              skills: "Node.js, Express, MongoDB",
            },
          ].map((job, index) => (
            <div
              key={index}
              className="p-3 bg-gray-100 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold">
                {job.role} - {job.company}
              </h3>
              <p className="text-sm text-gray-600">Location: {job.location}</p>
              <p className="text-sm">Requirements: {job.skills}</p>
              <a
                href="#"
                className="text-blue-500 hover:underline hover:text-blue-700"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
