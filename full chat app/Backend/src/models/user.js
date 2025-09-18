import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  unreadMessages: {
    type: Map,
    of: Number, // key: senderId, value: count
    default: {},
  },
});

const User = model("User", userSchema);
export default User;
