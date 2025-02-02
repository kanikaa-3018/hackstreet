import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { IoIosSend } from "react-icons/io";
import { MdGroup, MdPerson } from "react-icons/md";
import { FaUserFriends, FaComments } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useUser } from "../context/UserContext";

const socket = io("http://localhost:4000");

const ChatPage = () => {
  const [friends, setFriends] = useState([]);
  const { user, loading } = useUser();
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [groupInfo, setGroupInfo] = useState({
    total: 0,
    online: 0,
    offline: 0,
  });
  const [typing, setTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);

  const batchYear = user?.alumni?.year;
  const groupName = `Class of ${batchYear}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    let typingTimeout;

    if (user?.alumni?._id) {
      socket.emit("join", user.alumni._id);

      const fetchInitialData = async () => {
        try {
          setIsLoading(true);
          const token = localStorage.getItem("token");
          const response = await axios.get(
            "http://localhost:4000/api/v1/alumni/connections",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setFriends(response.data.connections);
          updateGroupInfo(response.data.connections);
        } catch (error) {
          console.error("Error fetching connections:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchInitialData();
      socket.emit("joinGroup", groupName);

      // Socket event listeners
      socket.on("receiveMessage", ({ senderId, message, time }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { senderId, message, time, status: "received" },
        ]);
      });

      socket.on("messageStatus", ({ messageId, status }) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === messageId ? { ...msg, status } : msg
          )
        );
      });

      socket.on("userTyping", ({ senderId, isTyping }) => {
        if (selectedChat?.id === senderId) {
          setTyping(isTyping);
        }
      });

      socket.on("updateOnlineStatus", ({ userId, online, lastActive }) => {
        setFriends((prevFriends) =>
          prevFriends.map((friend) =>
            friend._id === userId ? { ...friend, online, lastActive } : friend
          )
        );
        updateGroupInfo(friends);
      });
    }

    return () => {
      socket.off("receiveMessage");
      socket.off("messageStatus");
      socket.off("userTyping");
      socket.off("updateOnlineStatus");
      socket.disconnect();
    };
  }, [user, selectedChat]);

  const updateGroupInfo = (updatedFriends) => {
    setGroupInfo({
      total: updatedFriends.length,
      online: updatedFriends.filter((f) => f.online).length,
      offline: updatedFriends.filter((f) => !f.online).length,
    });
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (selectedChat) {
      socket.emit("typing", {
        senderId: user.alumni._id,
        receiverId: selectedChat.id,
        isTyping: true,
      });

      // Clear previous timeout
      if (typingTimeout) clearTimeout(typingTimeout);

      // Set new timeout
      typingTimeout = setTimeout(() => {
        socket.emit("typing", {
          senderId: user.alumni._id,
          receiverId: selectedChat.id,
          isTyping: false,
        });
      }, 2000);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const messageData = {
        id: Date.now().toString(),
        senderId: user.alumni._id,
        receiverId: selectedChat.id,
        message: newMessage,
        time: new Date().toLocaleTimeString(),
        status: "sending",
      };

      if (selectedChat.id === "group") {
        messageData.receiverId = groupName;
      }

      socket.emit("sendMessage", messageData);
      setMessages([...messages, messageData]);
      setNewMessage("");
      messageInputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/3 border-r p-4 bg-white shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {isGroupChat ? <FaComments /> : <FaUserFriends />}
            {isGroupChat ? "Groups" : "Friends"}
          </h2>
          <button
            onClick={() => setIsGroupChat(!isGroupChat)}
            className="bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition-colors"
          >
            {isGroupChat ? <MdPerson size={24} /> : <MdGroup size={24} />}
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-120px)]">
          <ul className="space-y-2">
            {!isGroupChat ? (
              friends.map((friend) => (
                <li
                  key={friend._id}
                  className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-200 rounded-lg shadow-sm transition-all ${
                    selectedChat?._id === friend._id ? "bg-blue-200" : ""
                  }`}
                  onClick={() => {
                    setSelectedChat(friend);
                    setMessages([]);
                  }}
                >
                  <div className="relative">
                    <img
                      src={friend.profileImage || "https://i.pinimg.com/236x/eb/8f/aa/eb8faa016a6b2e559d6b99541e1375c1.jpg"}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                    />
                    <span
                      className={`absolute bottom-0 right-1 w-3 h-3 rounded-full border-2 border-white ${
                        friend.online ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{friend.name}</p>
                    <p className="text-sm font-medium -mt-1 text-gray-600">
                      Batch of {friend.year}
                    </p>
                    <p className="text-xs text-gray-400">
                      {friend.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li
                className={`p-3 cursor-pointer hover:bg-gray-200 rounded-lg flex gap-2 items-center ${
                  selectedChat?.id === "group" ? "bg-blue-200" : ""
                }`}
                onClick={() => {
                  setSelectedChat({ id: "group", name: groupName });
                  setMessages([]);
                }}
              >
                <img
                  src="https://i.pinimg.com/236x/95/5e/b8/955eb85a8f75818ca43f16ee843b6c5f.jpg"
                  alt="Group"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold text-xl">{groupName}</p>
                  <p className="text-sm text-gray-600">
                    {groupInfo.online} online • {groupInfo.offline} offline •{" "}
                    {groupInfo.total} total
                  </p>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-2/3 p-4 flex flex-col">
        {selectedChat ? (
          <>
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-bold">
                {selectedChat.name}
                {typing && (
                  <span className="text-sm text-gray-500 ml-2">typing...</span>
                )}
              </h2>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <BsThreeDots size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-white border rounded-lg shadow-md mb-4">
              {messages.map((msg, index) => {
                const isOwnMessage = msg.senderId === user.alumni._id;
                const sender = friends.find((f) => f._id === msg.senderId);
                
                return (
                  <div
                    key={index}
                    className={`flex items-end gap-2 mb-4 ${
                      isOwnMessage ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isOwnMessage && (
                      <img
                        src={sender?.profileImage || "https://i.pravatar.cc/50?img=1"}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <div className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}>
                      <p
                        className={`py-2 px-4 rounded-2xl max-w-xs ${
                          isOwnMessage
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {msg.message}
                      </p>
                      <span className="text-xs text-gray-500 mt-1">
                        {msg.time}
                        {isOwnMessage && (
                          <span className="ml-2">
                            {msg.status === "sent" && "✓"}
                            {msg.status === "delivered" && "✓✓"}
                            {msg.status === "read" && "✓✓"}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2">
              <input
                ref={messageInputRef}
                type="text"
                value={newMessage}
                onChange={handleTyping}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 text-white px-6 rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Send
                <IoIosSend className="h-5 w-5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 text-lg">
              Select a friend or group to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;