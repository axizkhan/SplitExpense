import { create } from "zustand";

interface AuthState {
  user: any | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: any, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Get stored values from localStorage with error handling
  let parsedUser = null;
  let storedToken = null;

  try {
    storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedUser) {
      parsedUser = JSON.parse(storedUser);
    }
  } catch (error) {
    // Clear corrupted data
    try {
      localStorage.removeItem("authUser");
    } catch (e) {
      // Ignore error
    }
  }

  return {
    user: parsedUser,
    accessToken: storedToken,
    isAuthenticated: !!storedToken,
    setAuth: (user, token) => {
      try {
        localStorage.setItem("accessToken", token);
        const userJson = JSON.stringify(user);
        localStorage.setItem("authUser", userJson);

        set({
          user,
          accessToken: token,
          isAuthenticated: true,
        });
      } catch (error) {
        // Ignore error
      }
    },
    logout: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("authUser");
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
    },
  };
});
