import httpClient from "@/core/http/httpClient";

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

export interface JournalResponse {
  entries: JournalEntry[];
  totalPages: number;
  currentPage: number;
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
};
