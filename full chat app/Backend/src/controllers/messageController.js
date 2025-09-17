import Message from "../models/message.js";

export async function sendMessage(req, res) {
  const { text } = req.body;
  const user = req.user;
  const { id: receiverId } = req.params;

  try {
    const message = await Message.create({
      senderId: user._id,
      receiverId: receiverId,
      text: text,
    });

    res.status(201).json({ message });
  } catch (error) {
    console.error("Error in sendMessage >>", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function saveMessage({ senderId, receiverId, text }) {
  try {
    const message = await Message.create({
      senderId,
      receiverId,
      text,
    });
    return message;
  } catch (error) {
    console.error("Error saving message >>", error);
    throw error;
  }
}

export async function getChatMessage(req, res) {
  const user = req.user;
  const { id: receiverId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: user._id, receiverId: receiverId },
        { senderId: receiverId, receiverId: user._id },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error in getChatMessage >>", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
