import mongoose from "mongoose";
import { BalanceModel } from "../models/balanceModel";
export class BalanceService {
    constructor() { }
    async isBalanceExistThanUpdate(journelId, lenderId, borowerId, groupId, amount) {
        try {
            const result = await BalanceModel.updateOne({
                journelId,
                groupId,
                "balances.userId": { $all: [lenderId, borowerId] },
            }, {
                $inc: {
                    "balances.$[u1].receivedAmount": amount,
                    "balances.$[u2].receivedAmount": -amount,
                },
            }, {
                arrayFilters: [{ "u1.userId": borowerId }, { "u2.userId": lenderId }],
            });
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async newBalance(groupId, borowerId, lenderId, amount, journelId) {
        try {
            const balanceDocument = {
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
        }
        catch (err) {
            throw err;
        }
    }
    async getAllBalance(members, groupId, userId) {
        let balanceArray = await BalanceModel.find({
            groupId,
            balances: {
                $all: [
                    { $elemMatch: { userId } },
                    { $elemMatch: { userId: { $in: members } } },
                ],
            },
        }).populate({
            path: "balances.userId",
            select: "name.firstName name.lastName mobileNumber upiId _id email",
        });
        return balanceArray;
    }
    async updateUserBalance(groupId, userId, difference, member) {
        try {
            let averageExpense = difference / member;
            const userObjectId = new mongoose.Types.ObjectId(userId);
            // Update creator's balance entries (increase receivedAmount)
            await BalanceModel.updateMany({ groupId, "balances.userId": userObjectId }, { $inc: { "balances.$[elem].receivedAmount": averageExpense } }, { arrayFilters: [{ "elem.userId": userObjectId }] });
            // Update all other members' balance entries (decrease receivedAmount)
            // IMPORTANT: Must also check for creator's userId in the document to avoid updating unrelated transactions
            const result = await BalanceModel.updateMany({ groupId, "balances.userId": userObjectId }, { $inc: { "balances.$[elem].receivedAmount": -averageExpense } }, { arrayFilters: [{ "elem.userId": { $ne: userObjectId } }] });
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async updateBalanceAgntsPayemnt(groupId, paidById, paidToId, amount) {
        try {
            let result = await BalanceModel.findOneAndUpdate({
                groupId,
                "balances.userId": { $all: [paidById, paidToId] },
            }, { $inc: { "balances.$[paidby].receivedAmount": amount } }, { arrayFilters: [{ "paidby.userId": paidById }] });
            return result;
        }
        catch (err) {
            throw err;
        }
    }
}
