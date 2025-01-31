import Message from "../models/messageModel.js";


export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.alumni.id;

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    await newMessage.save();
    res.status(200).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error: error.message });
  }
};


export const getChatMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const loggedInUserId = req.alumni.id;

    const messages = await Message.find({
      $or: [
        { sender: loggedInUserId, receiver: userId },
        { sender: userId, receiver: loggedInUserId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error: error.message });
  }
};
