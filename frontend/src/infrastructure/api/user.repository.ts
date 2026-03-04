import httpClient from "@/core/http/httpClient";

export interface Group {
  _id: string;
  name: string;
  description?: string;
  members: string[];
  createdBy: string;
  createdAt: string;
}

export interface GroupDetails extends Group {
  totalExpense: number;
  youOwe: number;
  youWillReceive: number;
}

export const userRepository = {
  async getAllGroups(): Promise<Group[]> {
    const response = await httpClient.get("/api/auth/user");
    return response.data.data;
  },

  async getGroupDetails(groupId: string): Promise<GroupDetails> {
    const response = await httpClient.get(`/api/auth/group/${groupId}`);
    return response.data.data;
  },

  async createGroup(payload: {
    name: string;
    description?: string;
  }): Promise<Group> {
    const response = await httpClient.post("/api/auth/group", payload);
    return response.data.data;
  },

  async addMember(
    groupId: string,
    payload: { newMemberEmail: string },
  ): Promise<void> {
    await httpClient.put(`/api/auth/group/${groupId}`, payload);
  },
};
