import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  isHost: { type: Boolean, default: false },
  avatar: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userModel);
