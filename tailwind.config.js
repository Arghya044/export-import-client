/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bluish: {
          "primary": "#3b82f6",
          "secondary": "#1e40af",
          "accent": "#60a5fa",
          "neutral": "#1e293b",
          "base-100": "#eff6ff",
          "base-200": "#dbeafe",
          "base-300": "#bfdbfe",
          "info": "#3b82f6",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
      {
        deepdark: {
          "primary": "#ffffff",
          "secondary": "#e5e7eb",
          "accent": "#d1d5db",
          "neutral": "#6b7280",
          "base-100": "#111111",
          "base-200": "#222222",
          "base-300": "#333333",
          "info": "#60a5fa",
          "success": "#34d399",
          "warning": "#fbbf24",
          "error": "#f87171",
        },
      },
    ],
    darkTheme: "deepdark",
    base: true,
    styled: true,
    utils: true,
  },
};

