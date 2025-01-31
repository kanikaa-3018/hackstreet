import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo iiitm 1.png";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuMessageSquareText } from "react-icons/lu";
import Sidebar from "./Sidebar";
import io from "socket.io-client";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
   

  useEffect(() => {
    const socket = io("http://localhost:4000"); // Backend URL

    if (userId) {
      socket.emit("join", userId);
    }

    socket.on("receiveMessage", ({ senderId, message }) => {
      setMessages((prevMessages) => [...prevMessages, { senderId, message }]);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const socket = io("http://localhost:4000");
      socket.emit("sendMessage", {
        senderId: userId,
        receiverId: "receiverIdHere",
        message: newMessage,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId: userId, message: newMessage },
      ]);
      setNewMessage("");
    }
  };

  return (
    <nav className="w-full flex flex-col gap-4 pt-4 sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-12 w-full">
        <div className="">
          <h1 className="font-extrabold text-3xl heading">ALUMNI NEXUS</h1>
          <p className="pl-8">a digital hub for</p>
          <p className="pl-16">ALUMNI Networking...</p>
        </div>
        <div className="">
          <img src={logo} alt="Logo" className="w-20 h-auto" />
        </div>
        <div className="flex gap-2 justify-center">
          <p>Let's Connect</p>
          <div className="flex justify-center items-center gap-2">
            <FaInstagram />
            <FaLinkedin />
            <FaFacebook />
          </div>
        </div>
      </div>

      {/* Navbar Links */}
      <div className="bg-[#00016A] text-white p-4 flex gap-8 w-full items-center px-16">
        <button
          className="-ml-8"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <GiHamburgerMenu />
        </button>
        <Link to="/" className="hover:underline font-semibold">
          Home
        </Link>
        <Link to="/events" className="hover:underline font-semibold">
          Events
        </Link>
        <Link to="/about" className="hover:underline font-semibold">
          About
        </Link>
        <Link to="/updates" className="hover:underline font-semibold">
          Updates
        </Link>
        <Link to="/newsletter" className="hover:underline font-semibold">
          Newsletter
        </Link>
        <div className="ml-auto -mr-8">
          <LuMessageSquareText onClick={() => setIsChatOpen(!isChatOpen)} />
        </div>
      </div>

      {/* Sidebar Toggle */}
      {isSidebarOpen && <Sidebar />}

      {/* Chat Component */}
      {isChatOpen && (
        <div className="fixed bottom-0 right-0 m-4 bg-white shadow-lg rounded-lg w-80 h-96 p-4">
          <div className="h-72 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="border-b p-2">
                <p>
                  {msg.senderId === userId ? "You" : "Receiver"}: {msg.message}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border p-2 rounded"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
