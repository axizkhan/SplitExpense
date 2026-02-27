import mongoose from "mongoose";
const { Schema } = mongoose;

const EntrySchema = new Schema({
  lenderId: { type: Schema.Types.ObjectId, ref: "User" },
  borowerId: { type: Schema.Types.ObjectId, ref: "User" },
  expenseId: { type: Schema.Types.ObjectId, ref: "Expense" },
  groupId: { type: Schema.Types.ObjectId, ref: "Group" },
  amount: {
    type: Number,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

export const Entry = mongoose.model("Entry", EntrySchema);
