import mongoose from "mongoose";
import { Journel } from "../models/journelModel";
import { InternalServerError } from "../error/httpServerError";
export class JournelServices {
    async isJournelExistThanAddEntry(groupId, user1id, user2id, enteryId) {
        try {
            const result = await Journel.findOneAndUpdate({ groupId, users: { $all: [user1id, user2id] } }, { $push: { entryArray: new mongoose.Types.ObjectId(enteryId) } });
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async createNewJournel(groupId, user1Id, user2Id, entryId) {
        const newJournelDocument = {
            groupId: new mongoose.Types.ObjectId(groupId),
            users: [
                new mongoose.Types.ObjectId(user1Id),
                new mongoose.Types.ObjectId(user2Id),
            ],
            entryArray: [new mongoose.Types.ObjectId(entryId)],
        };
        try {
            const createdJournel = await Journel.create(newJournelDocument);
            if (createdJournel) {
                return createdJournel;
            }
            throw new InternalServerError();
        }
        catch (err) {
            throw err;
        }
    }
    async allUserJournel(journelId, pageNumber) {
        try {
            let limit = 10;
            let result = await Journel.find({ _id: journelId }).populate({
                path: "entryArray",
                populate: [
                    {
                        path: "lenderId",
                        select: "name.firstName name.lastName mobileNumber upiId _id email",
                    },
                    {
                        path: "borowerId",
                        select: "name.firstName name.lastName mobileNumber upiId _id email",
                    },
                    {
                        path: "expenseId",
                        select: "title description amount",
                    },
                    {
                        path: "paymentId",
                        select: "amount",
                    },
                ],
                options: {
                    sort: { _id: -1 },
                    skip: 10 * (pageNumber - 1),
                    limit: 10,
                },
            });
            const totalEnetryCount = await Journel.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(journelId) },
                },
                {
                    $project: {
                        _id: 0,
                        entryCount: { $size: "$entryArray" },
                    },
                },
            ]);
            return {
                journelData: result,
                totalEnetryCount: totalEnetryCount[0]?.entryCount || 0,
            };
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async allGroupJournalEntries(groupId, pageNumber) {
        try {
            let limit = 10;
            let result = await Journel.find({ groupId }).populate({
                path: "entryArray",
                populate: [
                    {
                        path: "lenderId",
                        select: "name.firstName name.lastName mobileNumber upiId _id email",
                    },
                    {
                        path: "borowerId",
                        select: "name.firstName name.lastName mobileNumber upiId _id email",
                    },
                    {
                        path: "expenseId",
                        select: "title description amount",
                    },
                    {
                        path: "paymentId",
                        select: "amount",
                    },
                ],
                options: {
                    sort: { _id: -1 },
                    skip: 10 * (pageNumber - 1),
                    limit: 10,
                },
            });
            const totalEntryCount = await Journel.aggregate([
                {
                    $match: { groupId: new mongoose.Types.ObjectId(groupId) },
                },
                {
                    $project: {
                        _id: 0,
                        entryCount: { $size: "$entryArray" },
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalCount: { $sum: "$entryCount" },
                    },
                },
            ]);
            return {
                journelData: result,
                totalEntryCount: totalEntryCount[0]?.totalCount || 0,
            };
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async userToUserJournalEntries(groupId, user1Id, user2Id, pageNumber) {
        try {
            let result = await Journel.find({
                groupId: new mongoose.Types.ObjectId(groupId),
                users: {
                    $all: [
                        new mongoose.Types.ObjectId(user1Id),
                        new mongoose.Types.ObjectId(user2Id),
                    ],
                },
            }).populate({
                path: "entryArray",
                populate: [
                    {
                        path: "lenderId",
                        select: "name.firstName name.lastName mobileNumber upiId _id email",
                    },
                    {
                        path: "borowerId",
                        select: "name.firstName name.lastName mobileNumber upiId _id email",
                    },
                    {
                        path: "expenseId",
                        select: "title description amount",
                    },
                    {
                        path: "paymentId",
                        select: "amount",
                    },
                ],
                options: {
                    sort: { _id: -1 },
                    skip: 10 * (pageNumber - 1),
                    limit: 10,
                },
            });
            const totalEntryCount = await Journel.aggregate([
                {
                    $match: {
                        groupId: new mongoose.Types.ObjectId(groupId),
                        users: {
                            $all: [
                                new mongoose.Types.ObjectId(user1Id),
                                new mongoose.Types.ObjectId(user2Id),
                            ],
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        entryCount: { $size: "$entryArray" },
                    },
                },
            ]);
            return {
                journelData: result,
                totalEntryCount: totalEntryCount[0]?.entryCount || 0,
            };
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
