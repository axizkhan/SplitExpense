// Journal entry types
export interface JournalEntry {
  _id: string;
  groupId: string;
  paidBy: string;
  paidTo: string;
  amount: number;
  description?: string;
  type: "expense" | "payment";
  createdAt: string;
}

export interface JournalDataEntry {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
  };
  entryArray: Array<{
    lenderId: string;
    type: string;
    amount: number;
  }>;
}

export interface JournalResponse {
  entries: JournalDataEntry[];
  totalEntryCount: number;
  paginatedData?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
}
