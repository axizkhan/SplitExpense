import { Types } from "mongoose";

export type BalanceResponse = {
  userAmount: number;
  memberAmount: number;

  _id: Types.ObjectId;
  groupId: Types.ObjectId;
  JournelId: Types.ObjectId;

  userId: Types.ObjectId | string;

  memberdetails: {
    _id: Types.ObjectId;
    name: {
      firstName: string;
      lastName: string;
    };
    mobileNumber?: number;
    upiId?: string;
  };
};

export type GroupSummaryResponse = {
  group:
    | {
        groupName?: string;
        description?: string;
        groupId?: Types.ObjectId | string; // ObjectId as string
        totalExpense?: number;
      }
    | "";
  balances: Array<BalanceResponse>;
  userData:
    | {
        amountOwed: number;
        amountToBeRecieved: number;
      }
    | "";
};
