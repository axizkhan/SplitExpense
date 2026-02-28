// models/entry.types.ts
import { Types } from "mongoose";

export interface IEntry {
  _id?: Types.ObjectId;

  lenderId: Types.ObjectId;
  borowerId: Types.ObjectId;
  expenseId: Types.ObjectId;
  groupId: Types.ObjectId;
  amount: number;

  updatedAt?: Date; // temporary / optional
  deletedAt?: Date | null; // temporary / optional
}
