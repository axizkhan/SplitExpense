import { createSystem, defaultConfig } from "@chakra-ui/react";

const customSystem = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        slate: {
          50: { value: "#f8fafc" },
          100: { value: "#f1f5f9" },
          200: { value: "#e2e8f0" },
          300: { value: "#cbd5e1" },
          400: { value: "#94a3b8" },
          500: { value: "#64748b" },
          600: { value: "#475569" },
          700: { value: "#334155" },
          800: { value: "#1e293b" },
          900: { value: "#0f172a" },
        },
      },
    },
    semanticTokens: {
      colors: {
        "bg.primary": { value: "#0f172a" },
        "bg.secondary": { value: "#1e293b" },
        "bg.tertiary": { value: "#334155" },
        "text.primary": { value: "#f1f5f9" },
        "text.secondary": { value: "#cbd5e1" },
        "text.muted": { value: "#94a3b8" },
      },
    },
  },
});

export default customSystem;
