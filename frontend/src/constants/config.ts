/**
 * Application Constants
 * Centralized configuration for the entire application
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
};

// App Configuration
export const APP_CONFIG = {
  APP_NAME: "Splitly",
  VERSION: "1.0.0",
  ENVIRONMENT: import.meta.env.MODE,
};

// Feature Flags
export const FEATURES = {
  ENABLE_ANALYTICS: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_DARK_MODE: true,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
};

// Table/List sizes
export const LIST_SIZES = {
  SMALL: 5,
  MEDIUM: 10,
  LARGE: 20,
};
