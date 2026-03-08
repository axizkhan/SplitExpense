// Payment-related types
export interface Payment {
  _id: string;
  paidBy: string;
  paidTo: string;
  amount: number;
  groupId: string;
  description?: string;
  createdAt: string;
}

export interface CreatePaymentPayload {
  paidBy: string;
  paidTo: string;
  amount: number;
  groupId: string;
}
