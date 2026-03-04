import { useMutation } from "@tanstack/react-query";
import { authRepository } from "@/infrastructure/api/auth.repository";
import { useAuth } from "@/core/state/auth";

export function useLogin() {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: authRepository.login,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
    },
  });
}

export function useSignup() {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: authRepository.signup,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
    },
  });
}
