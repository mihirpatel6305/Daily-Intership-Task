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

export async function getChatMessage(req, res) {
  const user = req.user;
  const { id: receiverId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: user._id, receiverId: receiverId },
        { senderId: receiverId, receiverId: user._id },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error in getChatMessage >>", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function saveMessage({ senderId, receiverId, text, isUnread }) {
  try {
    const message = await Message.create({
      senderId,
      receiverId,
      text,
      isUnread,
    });
    return message;
  } catch (error) {
    console.error("Error saving message >>", error);
    throw error;
  }
}

export async function markAsRead({ userId, chatWithId }) {
  try {
    const result = await Message.updateMany(
      {
        senderId: chatWithId,
        receiverId: userId,
        isUnread: true,
      },
      { $set: { isUnread: false } }
    );
    console.log("result>>", result);
    return result;
  } catch (error) {
    console.error("Error in MarkAsRead >>", error);
    throw error;
  }
}

export async function getUnreadCount(req, res) {
  console.log("getUnReadCount");
  const userId = req.user._id;
  console.log(userId);
  try {
    const unreadCounts = await Message.aggregate([
      { $match: { receiverId: userId, isUnread: true } },
      { $group: { _id: "$senderId", unreadCount: { $sum: 1 } } },
      { $project: { userId: "$_id", unreadCount: 1, _id: 0 } },
    ]);
    res
      .status(200)
      .send({ message: "Succefully fetched UnreadCounts", unreadCounts });
  } catch (error) {
    res.status(500).send("Something is Wrong in getUnreadCount", error);
  }
}

export async function fetchMessages(
  { senderId, receiverId },
  limit = 5,
  before
) {
  try {
    const query = {
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    };

    if (before) {
      query.createdAt = { $lt: before };
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);
    return messages;
  } catch (error) {
    console.error("Error in fetchMessages >>", error);
  }
}
