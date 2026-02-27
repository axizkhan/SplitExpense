import mongoose from "mongoose";
import { BadRequest } from "../error/httpClientError";
import { Expense } from "../models/expenseModel";
import { Group } from "../models/groupModel";
import { IExpense } from "../types/expense";
import { EntryService } from "./enetry.service";
import { JournelServices } from "./journel.service";
import { BalanceService } from "./balance.service";
import { InternalServerError } from "../error/httpServerError";

export class ExpenseService {
  private entryService: EntryService;
  private journelService: JournelServices;
  private balanceService: BalanceService;
  constructor() {
    this.entryService = new EntryService();
    this.journelService = new JournelServices();
    this.balanceService = new BalanceService();
  }
  async addExpense(
    expense: { title: string; amount: number; description?: string },
    groupId: string,
    userId: string,
  ) {
    console.log("add expense got request");
    const group = await Group.findOne({
      _id: groupId,
      "members.memberId": userId,
    });

    console.log(group, "GROUP**********************************");

    if (!group) {
      throw new BadRequest();
    }

    const expenseDocument: IExpense = {
      title: expense.title,
      amount: expense.amount,
      groupId: new mongoose.Types.ObjectId(groupId),
      paidBy: new mongoose.Types.ObjectId(userId),
    };
    if (expense.description) {
      expenseDocument.description = expense.description;
    }

    const createdExpense = await Expense.create(expenseDocument);

    console.log(createdExpense, "Expense****************************");

    let averageExpense = expense.amount / group.members.length;
    for (let member of group.members) {
      let borowerId = member.memberId.toString();
      if (borowerId !== userId) {
        const newEntry = await this.entryService.createEntry(
          userId,
          borowerId,
          groupId,
          averageExpense,
          createdExpense._id.toString(),
        );

        let newEntryId = newEntry._id.toString();

        let journel = await this.journelService.isJournelExistThanAddEntry(
          groupId,
          userId,
          borowerId,
          newEntryId,
        );

        if (!journel?._id) {
          journel = await this.journelService.createNewJournel(
            groupId,
            userId,
            borowerId,
            newEntryId,
          );

          console.log("*************JOURNEL DOT EXIST SO CREATED NEW ONE");
        }
        console.log(journel, "********************JOURNEL");

        let balance = await this.balanceService.isBalanceExistThanUpdate(
          journel._id.toString(),
          userId,
          borowerId,
          groupId,
          averageExpense,
        );

        if (!balance.modifiedCount) {
          await this.balanceService.newBalance(
            groupId,
            borowerId,
            userId,
            averageExpense,
            journel._id.toString(),
          );

          console.log(
            "***********BALANCE DONT EXIST SO CREATE ONE****************",
          );
        }

        console.log(balance, "*************************BALANCE");

        member.amountOwed += averageExpense;

        console.log("BALANCE ADD*************** to borowers");
      } else {
        member.amountToBeRecieved += averageExpense;
        console.log("BALANCE ADD*************** to lender");
      }
    }

    let result = await Group.findOneAndReplace({ _id: group._id }, group);

    if (result) {
      return result;
    }

    throw new InternalServerError();
  }
}
