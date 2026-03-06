/**
 * API Endpoints
 * Centralized API routes for the entire application
 */

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/noauth/login",
    SIGNUP: "/noauth/signup",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
  },

  // Group endpoints
  GROUPS: {
    LIST: "/auth/user",
    GET: (groupId: string) => `/auth/group/${groupId}`,
    CREATE: "/auth/group",
    UPDATE: (groupId: string) => `/auth/group/${groupId}`,
    DELETE: (groupId: string) => `/auth/group/${groupId}`,
    ADD_MEMBER: (groupId: string) => `/auth/group/${groupId}/member`,
  },

  // Expense endpoints
  EXPENSES: {
    LIST: (groupId: string) => `/auth/group/${groupId}/expenses`,
    USER_EXPENSES: (groupId: string) => `/auth/group/${groupId}/user-expenses`,
    CREATE: "/auth/expenses",
    UPDATE: (expenseId: string) => `/auth/expenses/${expenseId}`,
    DELETE: (expenseId: string) => `/auth/expenses/${expenseId}`,
  },

  // Payment endpoints
  PAYMENTS: {
    CREATE: "/auth/payment/pay",
    LIST: (groupId: string) => `/auth/group/${groupId}/payments`,
  },

  // Journal/entries endpoints
  JOURNAL: {
    LIST: (groupId: string) => `/auth/journel/${groupId}`,
    ENTRY: (entryId: string) => `/auth/journel/${entryId}`,
  },
};
