import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { FaLinkedin, FaInstagram, FaCalendarAlt,FaBriefcase } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import axios from "axios";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, loading } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  console.log(user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    position: "",
    currentLocation: "",
    batch: "",
    phone: "",
    company: "",
    linkedin: "",
    instagram: "",
    profileImage:null,
  });

  // Update formData when user data is available
  useEffect(() => {
    if (user?.alumni) {
      setFormData({
        name: user.alumni.name || "",
        email: user.alumni.email || "",
        bio: user.alumni.bio || "",
        position: user.alumni.position || "",
        currentLocation: user.alumni.location || "",
        batch: user.alumni.batch || "",
        phone: user.alumni.phone || "",
        company: user.alumni.company || "",
        linkedin: user.alumni.linkedin || "",
        instagram: user.alumni.instagram || "",
        profileImage: user.alumni.profileImage,
      });
      // Set the preview image as the current profile image
      setPreviewImage(user.alumni.profileImage);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  if (!user || !user.alumni) {
    return (
      <div className="text-center mt-10 text-lg text-red-500">
        User data not available.
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Display the selected image as a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (selectedFile) {
        formDataToSend.append("profileImage", selectedFile);
      }

      const response = await axios.put(
        "http://localhost:4000/api/v1/alumni/update",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        setIsEditing(false);
        window.location.reload();
      } else {
        alert(response.data.msg || "Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-xl mt-8 mb-12">
      <div className="flex items-center gap-6 border-b pb-4">
        <img
          src={previewImage || "https://i.pinimg.com/474x/c9/d0/d4/c9d0d46374265dca2773bc3e0e85fa38.jpg"}
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-gray-300 object-cover"
        />
        {isEditing && (
          <input type="file" onChange={handleFileChange} className="mt-2" />
        )}
        <div>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          ) : (
            <h2 className="text-2xl font-bold">{user.alumni.name}</h2>
          )}
          <p className="text-gray-600">
            {isEditing ? (
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
            ) : (
              user.alumni.position || "Not Specified"
            )}
          </p>
          <p className="text-sm text-gray-500">
            {user.alumni.year} • {user.alumni.college || "ABV-IIITM, Gwalior"}
          </p>
        </div>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="ml-auto flex items-center bg-[#00016a] text-white px-6 py-1 rounded-sm hover:bg-blue-900 transition"
        >
          <MdEdit className="mr-2" /> {isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>

      <div className="mt-1 p-3 rounded-lg">
        {isEditing ? (
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring focus:ring-blue-300 mt-2"
          />
        ) : (
          <p className="text-gray-600 mt-2">{user.alumni.bio || "No bio available."}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {[{ label: "Batch", name: "batch" }, { label: "Email", name: "email" }, { label: "Phone", name: "phone" }, { label: "Current Location", name: "currentLocation" }, { label: "Position", name: "position" }, { label: "Company", name: "company" }, { label: "LinkedIn", name: "linkedin" }, { label: "Instagram", name: "instagram" }].map(({ label, name }) => (
          <div
            key={name}
            className="p-3 bg-gray-100 rounded-lg border border-gray-300 shadow-sm hover:shadow-lg transition duration-300"
          >
            <label className="block font-semibold text-gray-700">{label}</label>
            {isEditing ? (
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
            ) : (
              <p className="text-gray-700 mt-1 font-medium">
                {user.alumni[name] || "Not Specified"}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-6 mt-6">
        {formData.linkedin && (
          <a
            href={formData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline hover:text-blue-800 flex items-center gap-2"
          >
            <FaLinkedin /> LinkedIn
          </a>
        )}
        {formData.instagram && (
          <a
            href={formData.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:underline hover:text-pink-800 flex items-center gap-2"
          >
            <FaInstagram /> Instagram
          </a>
        )}
      </div>
    
 




      {/* Recruitment Opportunities Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-12">Current Recruitment Opportunities</h3>
        <div className="space-y-4">
          {[
            {
              company: "TechCorp",
              position: "Software Engineer",
              location: "Gwalior, India",
              date: "Feb 15, 2025",
              link: "#",
            },
            {
              company: "Innovative Solutions",
              position: "Product Manager",
              location: "Remote",
              date: "Mar 1, 2025",
              link: "#",
            },
            {
              company: "NextGen Technologies",
              position: "Data Scientist",
              location: "Indore, India",
              date: "Feb 25, 2025",
              link: "#",
            },
            {
              company: "Creative Minds",
              position: "UI/UX Designer",
              location: "Bhopal, India",
              date: "Mar 10, 2025",
              link: "#",
            },
          ].map(({ company, position, currentLocation, date, link }, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold">{company}</h4>
                <p className="text-gray-600">{position}</p>
                <p className="text-sm text-gray-500">{currentLocation}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-xs text-gray-500">
                  <FaCalendarAlt className="inline mr-1" />
                  {date}
                </p>
                <a
                  href={link}
                  className="text-blue-600 hover:underline text-xs mt-2 flex items-center gap-1"
                >
                  <FaBriefcase className="inline" />
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
