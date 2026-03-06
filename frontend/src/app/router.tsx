import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/features/auth/pages";
import { SignupPage } from "@/features/auth/pages";
import { GroupListPage } from "@/features/groups/pages";
import { GroupDetailsPage } from "@/features/groups/pages";
import { JournalPage } from "@/features/journal/pages";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <SignupPage />
            </PublicOnlyRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <GroupListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/group/:groupId"
          element={
            <ProtectedRoute>
              <div className="flex flex-col w-full">
                <GroupDetailsPage />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/group/:groupId/journal/:memberId"
          element={
            <ProtectedRoute>
              <JournalPage />
            </ProtectedRoute>
          }
        />

        {/* Redirect root to dashboard or login */}
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
