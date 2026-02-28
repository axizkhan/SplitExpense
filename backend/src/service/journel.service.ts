import mongoose from "mongoose";
import { Journel } from "../models/journelModel";
import { IJournel } from "../types/journel";
import { InternalServerError } from "../error/httpServerError";

export class JournelServices {
  async isJournelExistThanAddEntry(
    groupId: string,
    user1id: string,
    user2id: string,
    enteryId: string,
  ) {
    try {
      const result = await Journel.findOneAndUpdate(
        { groupId, users: { $all: [user1id, user2id] } },
        { $push: { entryArray: new mongoose.Types.ObjectId(enteryId) } },
      );

      return result;
    } catch (err) {
      throw err;
    }
  }

  async createNewJournel(
    groupId: string,
    user1Id: string,
    user2Id: string,
    entryId: string,
  ) {
    const newJournelDocument: IJournel = {
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
    } catch (err) {
      throw err;
    }
  }
}
