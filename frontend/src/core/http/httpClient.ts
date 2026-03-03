import { AxiosError } from "axios";
import axios from "axios";

export interface NormalizeError {
  message?: string;
  status?: number;
  code?: string;
}

/**create axios instance */
const httpClient = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**Request interceptor */
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**Response interceptor */
httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const data:
      | {
          success: boolean;
          message: string;
          error: {
            message: string;
            code: string;
          };
        }
      | unknown = error.response?.data;

    const normalizeError: NormalizeError = {
      message: "Something went wrong",
      status,
    };

    if (data) {
      normalizeError.message =
        data.message || data.error?.message || normalizeError.message;

      normalizeError.code = data?.error?.code;
    }

    if (status === 401) {
      localStorage.removeItem("accessToken");
    }

    return Promise.reject(normalizeError);
  },
);
