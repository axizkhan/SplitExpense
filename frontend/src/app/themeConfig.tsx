import { createSystem, defaultConfig } from "@chakra-ui/react";

export const darkTheme = createSystem(defaultConfig, {
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
        vibrant: {
          blue: { value: "#3b82f6" },
          purple: { value: "#a78bfa" },
          pink: { value: "#f472b6" },
          green: { value: "#34d399" },
          orange: { value: "#fb923c" },
          cyan: { value: "#22d3ee" },
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
        "accent.primary": { value: "#3b82f6" },
        "accent.secondary": { value: "#a78bfa" },

        /* Status colors */
        "status.success": { value: "#34d399" },
        "status.warning": { value: "#fb923c" },
        "status.error": { value: "#f87171" },

        /* Borders */
        "border.default": { value: "#334155" },
        "border.subtle": { value: "#475569" },
      },
    },
  },
});
