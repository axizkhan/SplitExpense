import mongoose from "mongoose";
const { Schema } = mongoose;

const JournelSchema = new Schema({
  user1_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  user2_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  groupId: { type: Schema.Types.ObjectId, ref: "Group" },
  entryArray: [
    {
      type: Schema.Types.ObjectId,
      ref: "Entry",
    },
  ],
  amount: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

export const Journel = mongoose.model("Journel", JournelSchema);
