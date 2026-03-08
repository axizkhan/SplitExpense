import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/core/state/auth";

interface PublicOnlyProp {
  children: React.ReactNode;
}

function PublicOnlyRoute({ children }: PublicOnlyProp) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }
  return <>{children}</>;
}

export default PublicOnlyRoute;
