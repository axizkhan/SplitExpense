import { Group } from "../models/groupModel";
import mongoose from "mongoose";
export class GroupService {
    async createGroup(creatorId, name, description) {
        const creatorObjectId = new mongoose.Types.ObjectId(creatorId);
        const groupDocument = {
            name,
            totalAmount: 0,
            createdBy: creatorObjectId,
            members: [
                {
                    memberId: creatorObjectId,
                    amountOwed: 0,
                    amountToBeRecieved: 0,
                },
            ],
        };
        if (description) {
            groupDocument.description = description;
        }
        const group = await Group.create(groupDocument);
        return group;
    }
    async isUserExistInGroup(userId, groupId) {
        const group = await Group.findOne({
            _id: groupId,
            "members.memberId": userId,
        });
        if (group) {
            return group._id;
        }
        return null;
    }
    async addUserToGroup(groupId, newUserId) {
        try {
            const newMemberOject = {
                memberId: newUserId,
                amountOwed: 0,
                amountToBeRecieved: 0,
            };
            const result = await Group.updateOne({ _id: groupId, "members.memberId": { $ne: newUserId } }, { $push: { members: newMemberOject } });
            return result.modifiedCount;
        }
        catch (err) {
            throw err;
        }
    }
    async getAllGroup(userId) {
        let result = await Group.find({ "members.memberId": { $eq: userId } });
        return result;
    }
    async getGroup(groupId, userId) {
        let group = await Group.findOne({
            _id: groupId,
            "members.memberId": userId,
        }).populate("members.memberId", "email mobileNumber upiId _id name.firstName lastName");
        return group;
    }
    async userExpenseEdit(groupId, userId, amount, member) {
        try {
            let averageExpense = amount / member;
            let userExpense = averageExpense * (member - 1);
            let result = await Group.updateOne({ _id: groupId }, {
                $inc: {
                    "members.$[currentUser].amountToBeRecieved": userExpense,
                    "members.$[otherUsers].amountOwed": averageExpense,
                },
            }, {
                arrayFilters: [
                    { "currentUser.memberId": new mongoose.Types.ObjectId(userId) },
                    {
                        "otherUsers.memberId": {
                            $ne: new mongoose.Types.ObjectId(userId),
                        },
                    },
                ],
            });
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async getMemberCount(groupId) {
        try {
            const result = await Group.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(groupId),
                    },
                },
                {
                    $project: {
                        _id: 1,
                        memberCount: { $size: "$members" },
                    },
                },
            ]);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
}
