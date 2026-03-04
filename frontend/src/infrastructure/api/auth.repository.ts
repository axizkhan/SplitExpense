import httpClient from "@/core/http/httpClient";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: any;
  accessToken: string;
}

export const authRepository = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await httpClient.post("/api/user/login", payload);

    return response.data.data;
  },
};
