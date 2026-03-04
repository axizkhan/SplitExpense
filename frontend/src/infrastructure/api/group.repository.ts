import httpClient from "@/core/http/httpClient";

export const groupRepository = {
  async getGroups() {
    const response = await httpClient.get("/api/auth/group");
    return response.data.data;
  },

  async getGroup(groupId: string) {
    const response = await httpClient.get(`/api/auth/group/${groupId}`);
    return response.data.data;
  },
  async createGroup(payload: { name: string; description?: string }) {
    const response = await httpClient.post("/api/auth/group", payload);
    return response.data.data;
  },

  async addMember(payload: { newMemberEmail: string }, groupId: string) {
    const response = await httpClient.put(
      `/api/auth/group/${groupId}`,
      payload,
    );
    return response.data.data;
  },
};
