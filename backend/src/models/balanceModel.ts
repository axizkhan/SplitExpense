import mongoose from "mongoose";
const { Schema } = mongoose;

const BalanceSchema = new Schema(
  {
    user1Id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    user2Id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    journelId: {
      type: Schema.Types.ObjectId,
      ref: "Journel",
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
    user1_OweAmount: {
      type: Number,
      required: true,
    },
    user2_OweAmount: {
      type: Number,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export const BalanceModel = mongoose.model("Balance", BalanceSchema);
