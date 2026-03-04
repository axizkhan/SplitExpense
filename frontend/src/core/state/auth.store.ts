import { create } from "zustand";

interface AuthState {
  user: any | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: any, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
  setAuth: (user, token) => {
    localStorage.setItem("accessToken", token);
    set({
      user,
      accessToken: token,
      isAuthenticated: true,
    });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },
}));
