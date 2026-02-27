import mongoose from "mongoose";
import { BalanceModel } from "../models/balanceModel";
import { IJournel } from "../types/journel";
import { IBalance } from "../types/balance";

export class BalanceService {
  constructor() {}
  async isBalanceExistThanUpdate(
    journelId: string,
    lenderId: string,
    borowerId: string,

    groupId: string,
    amount: number,
  ) {
    try {
      const result = await BalanceModel.updateOne(
        {
          journelId,
          groupId,
          "balances.userId": { $all: [lenderId, borowerId] },
        },
        {
          $inc: {
            "balances.$[u1].receivedAmount": amount,
            "balances.$[u2].receivedAmount": -amount,
          },
        },
        {
          arrayFilters: [{ "u1.userId": borowerId }, { "u2.userId": lenderId }],
        },
      );

      return result;
    } catch (err) {
      throw err;
    }
  }
  async newBalance(
    groupId: string,
    borowerId: string,
    lenderId: string,
    amount: number,
    journelId: string,
  ) {
    try {
      const balanceDocument: IBalance = {
        groupId: new mongoose.Types.ObjectId(groupId),
        journelId: new mongoose.Types.ObjectId(journelId),
        balances: [
          {
            userId: new mongoose.Types.ObjectId(borowerId),
            receivedAmount: -amount,
          },
          {
            userId: new mongoose.Types.ObjectId(lenderId),
            receivedAmount: amount,
          },
        ],
      };

      let result = await BalanceModel.create(balanceDocument);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
