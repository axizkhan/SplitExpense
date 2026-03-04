import mongoose from "mongoose";
const { Schema } = mongoose;
let accountSchema = new Schema({
    type: { type: String, enum: ["google", "local"] },
    passwordHash: { type: String },
    providerId: { type: String },
});
const userSchema = new Schema({
    emailId: { type: String, required: true, unique: true, sparse: true },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    mobileNumber: { type: Number },
    upiId: { type: String },
    account: accountSchema,
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
});
export const UserModel = mongoose.model("User", userSchema);
