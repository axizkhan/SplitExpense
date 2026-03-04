import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/core/state/auth";

interface ProtectedProps {
  children: ReactNode;
}

export default function ProtectedPath({ children }: ProtectedProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={"/login"}
        replace
      />
    );
  }

  return <>{children}</>;
}
