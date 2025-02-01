import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../public/logo iiitm 1.png";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/alumni/login",
        {
          email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      toast.success("Login successful! 🎉", {
        position: "top-right",
        autoClose: 3000,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user); 
      }

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed! ❌", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg flex overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-blue-100 p-6">
          <img src={logo} alt="College Logo" className="w-28 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Welcome to <br />
            <span className="heading text-2xl font-bold text-[#00016a]">
              ALUMNI NEXUS
            </span>
          </h2>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl heading font-extrabold text-gray-700 mb-6 text-center capitalize border-b-2 pb-4">
            Login
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#00016a] text-white py-2 rounded-lg hover:bg-blue-900 transition"
            >
              Login
            </button>
          </form>

          {/* Forgot Password & Sign Up Links */}
          <p className="text-sm text-gray-500 text-center mt-4">
            Forgot password?{" "}
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Reset here
            </Link>
          </p>
          <p className="text-sm text-gray-500 text-center mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
