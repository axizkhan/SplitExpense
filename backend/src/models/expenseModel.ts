import mongoose from "mongoose";
const { Schema } = mongoose;

const ExpenseSchema = new Schema({
  groupId: { type: Schema.Types.ObjectId, ref: "Group" },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
  },
  paidBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

export const Expense = mongoose.model("Expense", ExpenseSchema);
