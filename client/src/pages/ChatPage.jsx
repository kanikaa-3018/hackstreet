import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { IoIosSend } from "react-icons/io";
import { MdGroup, MdPerson } from "react-icons/md";
import { FaUserFriends, FaComments } from "react-icons/fa";

const socket = io("http://localhost:4000");

const ChatPage = () => {
    
  const [friends, setFriends] = useState([
    {
      id: "user1",
      name: "Alice",
      image: "https://i.pravatar.cc/50?img=1",
      subtitle: "Class of 2020",
      online: true,
    },
    {
      id: "user2",
      name: "Bob",
      image: "https://i.pravatar.cc/50?img=2",
      subtitle: "Class of 2020",
      online: false,
    },
    {
      id: "user3",
      name: "Charlie",
      image: "https://i.pravatar.cc/50?img=3",
      subtitle: "Class of 2020",
      online: true,
    },
  ]);

  const [userId, setUserId] = useState("myUserId");
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [groupInfo, setGroupInfo] = useState({
    total: friends.length,
    online: 2,
    offline: 1,
  });

  useEffect(() => {
    if (userId) {
      socket.emit("join", userId);
    }

    socket.on("receiveMessage", ({ senderId, message }) => {
      if (selectedChat && senderId === selectedChat.id) {
        setMessages((prevMessages) => [...prevMessages, { senderId, message }]);
      }
    });

    socket.on("updateOnlineStatus", ({ userId, online }) => {
      setFriends((prevFriends) =>
        prevFriends.map((friend) =>
          friend.id === userId ? { ...friend, online } : friend
        )
      );

      setGroupInfo({
        total: friends.length,
        online: friends.filter((friend) => friend.online).length,
        offline: friends.filter((friend) => !friend.online).length,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, selectedChat, friends]);

  const sendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      socket.emit("sendMessage", {
        senderId: userId,
        receiverId: selectedChat.id,
        message: newMessage,
        
      });
      setMessages([...messages, { senderId: userId, message: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/3 border-r p-4 bg-white shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {isGroupChat ? <FaComments /> : <FaUserFriends />}{" "}
            {isGroupChat ? "Groups" : "Friends"}
          </h2>
          <button
            onClick={() => setIsGroupChat(!isGroupChat)}
            className="bg-gray-300 p-2 rounded-full hover:bg-gray-400"
          >
            {isGroupChat ? <MdPerson size={24} /> : <MdGroup size={24} />}
          </button>
        </div>
        <ul>
          {!isGroupChat ? (
            friends.map((friend) => (
              <li
                key={friend.id}
                className={`flex items-center p-3 cursor-pointer hover:bg-gray-200 rounded-lg shadow-sm transition-all ${
                  selectedChat?.id === friend.id ? "bg-blue-200" : ""
                }`}
                onClick={() => {
                  setSelectedChat(friend);
                  setMessages([]);
                }}
              >
                <div className="relative">
                  <img
                    src={friend.image}
                    alt={friend.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  {friend.online && (
                    <span className="absolute bottom-0 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-lg">{friend.name}</p>
                  <p className="text-sm text-gray-600">{friend.subtitle}</p>
                </div>
              </li>
            ))
          ) : (
            <li
              className={`p-3 cursor-pointer hover:bg-gray-200 rounded-lg flex gap-2 items-center ${
                selectedChat?.id === "group" ? "bg-blue-200" : ""
              }`}
              onClick={() => {
                setSelectedChat({ id: "group", name: "Group Chat" });
                setMessages([]);
              }}
            >
              <img
                src="https://i.pinimg.com/236x/95/5e/b8/955eb85a8f75818ca43f16ee843b6c5f.jpg"
                alt=""
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="font-bold text-xl">Class of 2024</p>
                <p className="text-sm text-gray-600">
                  {groupInfo.online} online, {groupInfo.offline} offline,{" "}
                  {groupInfo.total} total
                </p>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div className="w-2/3 p-4 flex flex-col">
        {selectedChat ? (
          <>
            <h2 className="text-xl font-bold mb-4 border-b pb-2">
              Chat with {selectedChat.name}
            </h2>
            <div className="flex-1 overflow-y-auto p-2 bg-white border rounded-lg shadow-md flex flex-col">
              {messages.map((msg, index) => {
                const sender = friends.find((f) => f.id === msg.senderId) || {
                  image: "https://i.pravatar.cc/50?img=4",
                };
                return (
                  <div
                    key={index}
                    className={`flex items-end gap-2 p-2 ${
                      msg.senderId === userId ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.senderId !== userId && (
                      <img
                        src={sender.image}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <p
                      className={`py-2 px-6 shadow-md max-w-xs ${
                        msg.senderId === userId
                          ? "bg-[#00016a] text-white self-end rounded-tr-lg rounded-tl-lg rounded-bl-lg"
                          : "bg-gray-200 self-start rounded-tr-lg rounded-tl-lg rounded-br-lg"
                      }`}
                    >
                      {msg.message}
                    </p>
                    {msg.senderId === userId && (
                      <img
                        src="https://i.pravatar.cc/50?img=5"
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex mt-4 border-t pt-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border p-2 rounded-lg shadow-sm"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white p-2 ml-2 rounded-lg flex gap-2 items-center px-6 hover:bg-blue-600"
              >
                Send <IoIosSend className="h-5 w-5" />
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            Select a friend or group to start chatting
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
