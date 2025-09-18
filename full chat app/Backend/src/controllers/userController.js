import User from "../models/user.js";

export async function getAllUser(req, res) {
  const loginUserId = req.user._id;
  try {
    const allUser = await User.find({ _id: { $ne: loginUserId } });
    res.status(201).json(allUser);
  } catch (error) {
    console.error("Error in getAllUser>>", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getLoginUser = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in getLoginUser", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUnreadMessage = async (senderId, receiverId) => {
  await User.findByIdAndUpdate(
    receiverId,
    { $inc: { [`unreadMessages.${senderId}`]: 1 } },
    { upsert: true }
  );
};

export const resetUnreadMessage = async (req, res) => {
  try {
    const { id: senderId } = req.params;
    const receiverId = req.user._id;

    if (!senderId) {
      return res
        .status(400)
        .json({ success: false, message: "Sender ID is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      receiverId,
      { $set: { [`unreadMessages.${senderId}`]: 0 } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "Receiver not found" });
    }

    res.status(200).json({
      success: true,
      message: `Unread messages with ${senderId} reset successfully`,
      unreadMessages: updatedUser.unreadMessages,
    });
  } catch (error) {
    console.error("Error in resetUnreadMessage >>", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
