import httpClient from "@/core/http/httpClient";

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber?: string;
  upiId?: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  accessToken: string;
}

export const authRepository = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await httpClient.post("/api/user/login-local", payload);
    return response.data.data;
  },

  async signup(payload: SignupPayload): Promise<AuthResponse> {
    const response = await httpClient.post("/api/user/signup-local", payload);
    return response.data.data;
  },
};
