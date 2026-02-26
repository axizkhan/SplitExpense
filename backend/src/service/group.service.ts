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
}
