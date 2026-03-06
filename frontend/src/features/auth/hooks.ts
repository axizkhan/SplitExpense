import { useMutation } from "@tanstack/react-query";
import { authRepository } from "@/infrastructure/api/auth.repository";
import { useAuth } from "@/core/state/auth";
import { useToast } from "@/shared/toastService";

export function useLogin() {
  const { setAuth } = useAuth();
  const toast = useToast();

  return useMutation({
    mutationFn: authRepository.login,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      const firstName = data.user?.firstName || "User";
      toast.success("Login Successful", `Welcome back, ${firstName}!`);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error("Login Failed", errorMessage);
    },
  });
}

export function useSignup() {
  const { setAuth } = useAuth();
  const toast = useToast();

  return useMutation({
    mutationFn: authRepository.signup,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      const firstName = data.user.firstName || "User";
      toast.success(
        "Signup Successful",
        `Welcome ${firstName}! Your account has been created.`,
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Signup failed. Please try again.";
      toast.error("Signup Failed", errorMessage);
    },
  });
}
