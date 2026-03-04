import mongoose from "mongoose";
import { BadRequest } from "../error/httpClientError";
import { Expense } from "../models/expenseModel";
import { Group } from "../models/groupModel";
import { EntryService } from "./enetry.service";
import { JournelServices } from "./journel.service";
import { BalanceService } from "./balance.service";
import { InternalServerError } from "../error/httpServerError";
export class ExpenseService {
    constructor() {
        this.entryService = new EntryService();
        this.journelService = new JournelServices();
        this.balanceService = new BalanceService();
    }
    async addExpense(expense, groupId, userId) {
        console.log("add expense got request");
        const group = await Group.findOne({
            _id: groupId,
            "members.memberId": userId,
        });
        if (!group) {
            throw new BadRequest();
        }
        const expenseDocument = {
            title: expense.title,
            amount: expense.amount,
            groupId: new mongoose.Types.ObjectId(groupId),
            paidBy: new mongoose.Types.ObjectId(userId),
        };
        if (expense.description) {
            expenseDocument.description = expense.description;
        }
        const createdExpense = await Expense.create(expenseDocument);
        let averageExpense = expense.amount / group.members.length;
        let creatorAmount = averageExpense * (group.members.length - 1);
        for (let member of group.members) {
            let borowerId = member.memberId.toString();
            if (borowerId !== userId) {
                const newEntry = await this.entryService.createEntry(userId, borowerId, groupId, averageExpense, createdExpense._id.toString());
                let newEntryId = newEntry._id.toString();
                let journel = await this.journelService.isJournelExistThanAddEntry(groupId, userId, borowerId, newEntryId);
                if (!journel?._id) {
                    journel = await this.journelService.createNewJournel(groupId, userId, borowerId, newEntryId);
                }
                let balance = await this.balanceService.isBalanceExistThanUpdate(journel._id.toString(), userId, borowerId, groupId, averageExpense);
                if (!balance.modifiedCount) {
                    await this.balanceService.newBalance(groupId, borowerId, userId, averageExpense, journel._id.toString());
                }
                member.amountOwed += averageExpense;
            }
            else {
                member.amountToBeRecieved += creatorAmount;
            }
        }
        let result = await Group.findOneAndReplace({ _id: group._id }, group);
        if (result) {
            return result;
        }
        throw new InternalServerError();
    }
    async getAllExpense(groupId) {
        try {
            let result = await Expense.find({ groupId }).sort({ _id: -1 });
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getAllUserExpense(groupId, userId) {
        try {
            let result = await Expense.find({ groupId, paidBy: userId }).sort({
                _id: -1,
            });
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async updateUserExpense(expenseId, difference) {
        try {
            let result = await Expense.findOneAndUpdate({ _id: expenseId }, { $inc: { amount: difference } });
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getExpense(expenseId) {
        try {
            let result = await Expense.findOne({ _id: expenseId });
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async deleteExpense(expenseId) {
        try {
            let result = await Expense.findByIdAndDelete(expenseId);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
}
