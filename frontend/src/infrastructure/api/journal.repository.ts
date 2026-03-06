import httpClient from "@/core/http/httpClient";
import type { JournalResponse } from "@/features/journal/types/journal";

export interface JournalEntry {
  _id: string;
  type: "expense" | "payment";
  description: string;
  amount: number;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export const journalRepository = {
  async getJournalEntries(
    journalId: string,
    pageNumber: number = 1,
  ): Promise<JournalResponse> {
    const response = await httpClient.get(
      `/api/auth/journel/${journalId}/${pageNumber}`,
    );
    return response.data.data;
  },

  async getGroupJournalEntries(
    groupId: string,
    pageNumber: number = 1,
  ): Promise<JournalResponse> {
    const response = await httpClient.get(
      `/api/auth/journel/group/${groupId}/${pageNumber}`,
    );
    return response.data.data;
  },

  async getUserToUserJournalEntries(
    groupId: string,
    memberId: string,
    pageNumber: number = 1,
  ): Promise<JournalResponse> {
    const response = await httpClient.get(
      `/api/auth/journel/group/${groupId}/${memberId}/${pageNumber}`,
    );
    return response.data.data;
  },
};
