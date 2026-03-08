import httpClient from "@/core/http/httpClient";

export interface PaymentPayload {
  groupId: string;
  paidToId: string;
  amount: number;
}

export interface Payment {
  _id: string;
  paidBy: string;
  paidTo: string;
  amount: number;
  groupId: string;
  createdAt: string;
}

export const paymentRepository = {
  async createPayment(payload: PaymentPayload): Promise<Payment> {
    const response = await httpClient.post("/api/auth/payment", payload);
    return response.data.data;
  },
};
