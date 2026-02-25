import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: Number },
  upiId: { type: String },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

export const User = mongoose.model("User", userSchema);
