import { Group } from "../models/groupModel";
import { IGroup } from "../types/group";
import mongoose from "mongoose";

export class GroupService {
  async createGroup(
    creatorId: string,
    name: string,
    description: string | undefined,
  ) {
    const creatorObjectId = new mongoose.Types.ObjectId(creatorId);
    const groupDocument: IGroup = {
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

  async isUserExistInGroup(userId: string, groupId: string) {
    const group = await Group.findOne({
      _id: groupId,
      "members.memberId": userId,
    });
    if (group) {
      return group._id;
    }
    return null;
  }

  async addUserToGroup(groupId: string, newUserId: string) {
    try {
      const newMemberOject = {
        memberId: newUserId,
        amountOwed: 0,
        amountToBeRecieved: 0,
      };
      const result = await Group.updateOne(
        { _id: groupId, "members.memberId": { $ne: newUserId } },
        { $push: { members: newMemberOject } },
      );

      return result.modifiedCount;
    } catch (err) {
      throw err;
    }
  }

  async getAllGroup(userId: string) {
    let result = await Group.find({ "members.memberId": { $eq: userId } });
    return result;
  }

  async getGroup(groupId: string, userId: string) {
    let group = await Group.findOne({
      _id: groupId,
      "members.memberId": userId,
    }).populate(
      "members.memberId",
      "email mobileNumber upiId _id name.firstName lastName",
    );
    return group;
  }
}
