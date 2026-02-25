import mongoose from "mongoose";
const { Schema } = mongoose;

const GroupSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  members: [
    {
      memberId: { type: Schema.Types.ObjectId, ref: "User" },
      amountOwed: { type: Number, default: 0 },
      amountRecieved: { type: Number, default: 0 },
    },
  ],
});

export const Group = mongoose.model("Group", GroupSchema);
