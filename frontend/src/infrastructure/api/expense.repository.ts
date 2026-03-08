import httpClient from "@/core/http/httpClient";

export interface ExpensePayload {
  title: string;
  description?: string;
  amount: number;
}

export interface UserInfo {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
}

export interface Expense {
  _id: string;
  title: string;
  description?: string;
  amount: number;
  paidBy: string | UserInfo;
  splitBetween: string[];
  createdAt: string;
}

export const expenseRepository = {
  async createExpense(
    payload: ExpensePayload,
    groupId: string,
  ): Promise<Expense> {
    const response = await httpClient.post(
      `/api/auth/expense/${groupId}`,
      payload,
    );
    return response.data.data;
  },

  async getGroupExpenses(groupId: string): Promise<Expense[]> {
    const response = await httpClient.get(`/api/auth/expense/${groupId}`);
    return response.data.data;
  },

  async getUserExpenses(groupId: string): Promise<Expense[]> {
    const response = await httpClient.get(`/api/auth/expense/user/${groupId}`);
    return response.data.data;
  },

  async editExpense(
    expenseId: string,
    newExpenseAmount: number,
  ): Promise<Expense> {
    const response = await httpClient.put(`/api/auth/expense/${expenseId}`, {
      newExpenseAmount,
    });
    return response.data.data;
  },

  async deleteExpense(expenseId: string): Promise<void> {
    await httpClient.delete(`/api/auth/expense/${expenseId}`);
  },
};
