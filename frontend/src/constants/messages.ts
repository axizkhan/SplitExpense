/**
 * Toast and Error Messages
 * Centralized messages for user feedback
 */

export const MESSAGES = {
  // Success messages
  SUCCESS: {
    GROUP_CREATED: "Group created successfully",
    GROUP_DELETED: "Group deleted successfully",
    MEMBER_ADDED: "Member added successfully",
    EXPENSE_CREATED: "Expense created successfully",
    EXPENSE_DELETED: "Expense deleted successfully",
    EXPENSE_UPDATED: "Expense updated successfully",
    PAYMENT_SUCCESS: "Payment recorded successfully",
  },

  // Error messages
  ERROR: {
    GENERIC: "Something went wrong. Please try again.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    GROUP_NOT_FOUND: "Group not found",
    INVALID_CREDENTIALS: "Invalid email or password",
    USER_ALREADY_EXISTS: "User already exists",
    NETWORK_ERROR: "Network error. Please check your connection.",
    SERVER_ERROR: "Server error. Please try again later.",
  },

  // Info messages
  INFO: {
    LOADING: "Loading...",
    SAVING: "Saving...",
  },

  // Confirmation messages
  CONFIRM: {
    DELETE_GROUP: "Are you sure you want to delete this group?",
    DELETE_EXPENSE: "Are you sure you want to delete this expense?",
  },
};

// Toast notification duration (in milliseconds)
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 4000,
  LONG: 6000,
};
