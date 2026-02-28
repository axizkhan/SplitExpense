import mongoose from "mongoose";
import { IEntry } from "../types/entery";
import { Entry } from "../models/entryModel";
import { InternalServerError } from "../error/httpServerError";

export class EntryService {
  constructor() {}

  createEntry(
    lenderId: string,
    borowerId: string,
    groupId: string,
    amount: number,
    expenseId: string,
  ) {
    const entryDocument: IEntry = {
      lenderId: new mongoose.Types.ObjectId(lenderId),
      borowerId: new mongoose.Types.ObjectId(borowerId),
      groupId: new mongoose.Types.ObjectId(groupId),
      amount,
      expenseId: new mongoose.Types.ObjectId(expenseId),
    };

    const newEntry = Entry.create(entryDocument);
    if (newEntry) {
      return newEntry;
    }

    throw new InternalServerError();
  }

  async allUserJournel(journelId: string, pageNumber: number) {
    let limit = 10;
    let result = await Journel.find({ _id: journelId })
      .sort({ _id: -1 })
      .limit(limit)
      .skip(limit * (pageNumber - 1));
  }
}
