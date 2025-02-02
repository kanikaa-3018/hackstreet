import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import Alumni from "./models/alumniModel.js";
import Message from "./models/messageModel.js";

dotenv.config();
connectDB();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/v1/alumni", alumniRoutes);
app.use("/api/v1/message", messageRoutes);

// Store connected users and their states
let users = {};
let groupMembers = {};
let typingUsers = new Set();

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining
  socket.on("join", async (alumniId) => {
    try {
      const alumni = await Alumni.findById(alumniId);
      if (!alumni) {
        socket.emit("error", "Invalid alumni ID");
        return;
      }

      // Store user connection
      users[alumniId] = {
        socketId: socket.id,
        batch: alumni.batch,
        lastActive: new Date(),
      };

      // Update online status
      alumni.online = true;
      alumni.lastActive = new Date();
      await alumni.save();

      // Broadcast online status
      io.emit("updateOnlineStatus", { 
        alumniId, 
        online: true,
        lastActive: alumni.lastActive 
      });

      // Join batch group
      const groupName = `Batch ${alumni.batch}`;
      socket.join(groupName);
      
      if (!groupMembers[groupName]) {
        groupMembers[groupName] = new Set();
      }
      groupMembers[groupName].add(alumniId);

      // Send group info update
      io.to(groupName).emit("updateGroupInfo", {
        total: groupMembers[groupName].size,
        online: Array.from(groupMembers[groupName])
          .filter(id => users[id]?.socketId).length,
        members: Array.from(groupMembers[groupName])
      });

      // Send pending messages
      const pendingMessages = await Message.find({
        receiverId: alumniId,
        status: "sent"
      }).sort({ createdAt: -1 }).limit(50);

      if (pendingMessages.length > 0) {
        socket.emit("pendingMessages", pendingMessages);
      }

    } catch (error) {
      console.error("Join error:", error);
      socket.emit("error", "Failed to join chat");
    }
  });

  // Handle typing indicators
  socket.on("typing", ({ senderId, receiverId, isTyping }) => {
    const key = `${senderId}:${receiverId}`;
    if (isTyping) {
      typingUsers.add(key);
    } else {
      typingUsers.delete(key);
    }

    if (receiverId.startsWith("Batch")) {
      io.to(receiverId).emit("userTyping", { senderId, isTyping });
    } else if (users[receiverId]) {
      io.to(users[receiverId].socketId).emit("userTyping", { senderId, isTyping });
    }
  });

  // Handle message sending
  socket.on("sendMessage", async ({ senderId, receiverId, message, messageType = "text" }) => {
    try {
      // Create and save message
      const newMessage = new Message({
        senderId,
        receiverId,
        content: message,
        type: messageType,
        status: "sent",
        timestamp: new Date()
      });
      await newMessage.save();

      // Send to recipient(s)
      const messageData = {
        messageId: newMessage._id,
        senderId,
        message,
        type: messageType,
        timestamp: newMessage.timestamp
      };

      if (receiverId.startsWith("Batch")) {
        io.to(receiverId).emit("receiveMessage", messageData);
      } else if (users[receiverId]) {
        io.to(users[receiverId].socketId).emit("receiveMessage", messageData);
      }

      // Acknowledge message receipt to sender
      socket.emit("messageSent", { 
        messageId: newMessage._id,
        status: "sent" 
      });

    } catch (error) {
      console.error("Send message error:", error);
      socket.emit("messageError", { 
        error: "Failed to send message",
        timestamp: new Date()
      });
    }
  });

  // Handle message status updates
  socket.on("messageStatus", async ({ messageId, status }) => {
    try {
      const message = await Message.findById(messageId);
      if (message) {
        message.status = status;
        await message.save();
        
        // Notify sender of status change
        if (users[message.senderId]) {
          io.to(users[message.senderId].socketId).emit("messageStatusUpdate", {
            messageId,
            status
          });
        }
      }
    } catch (error) {
      console.error("Message status update error:", error);
    }
  });

  // Handle disconnection
  socket.on("disconnect", async () => {
    const alumniId = Object.keys(users).find(id => users[id]?.socketId === socket.id);
    
    if (alumniId) {
      try {
        const alumni = await Alumni.findById(alumniId);
        if (alumni) {
          // Update alumni status
          alumni.online = false;
          alumni.lastActive = new Date();
          await alumni.save();

          // Clean up user data
          const batch = users[alumniId].batch;
          const groupName = `Batch ${batch}`;
          
          delete users[alumniId];
          
          // Update group members if needed
          if (groupMembers[groupName]) {
            io.to(groupName).emit("updateGroupInfo", {
              total: groupMembers[groupName].size,
              online: Array.from(groupMembers[groupName])
                .filter(id => users[id]?.socketId).length,
              members: Array.from(groupMembers[groupName])
            });
          }

          // Broadcast offline status
          io.emit("updateOnlineStatus", { 
            alumniId, 
            online: false,
            lastActive: alumni.lastActive 
          });
        }
      } catch (error) {
        console.error("Disconnect error:", error);
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server Listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));