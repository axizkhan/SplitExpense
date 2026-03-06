// Expense-related types
export interface Expense {
  _id: string;
  title: string;
  description?: string;
  amount: number;
  paidBy: string;
  participants: string[];
  groupId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateExpensePayload {
  title: string;
  description?: string;
  amount: number;
  paidBy: string;
  participants: string[];
}
