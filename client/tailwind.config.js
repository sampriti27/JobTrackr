/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      t: "0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      orange: "0px 20px 20px -15px rgba(245,56,56,0.81) ",
      "orange-md": "0px 20px 40px -15px rgba(245,56,56,0.81) ",
      none: "none",
    },
    colors: {
      transparent: "transparent",
      black: {
        500: "#4F5665",
        600: "#0B132A",
        650: "#323232",
        700: "#1D1D1D",
        800: "#121212",
      },
      green: {
        300: "#86efac",
        550: "#20BD5F",
        500: "#2FAB73",
        600: "#16a34a",
        900: "#14532d"
      },
      white: {
        300: "#F8F8F8",
        400: "#C4C5C5",
        500: "#FFFFFF",
      },
      gray: {
        100: "#EEEFF2",
        300: "#d1d5db",
        400: "#AFB5C0",
        500: "#DDDDDD", 
        700: "#374151",
        950: "#030712",
        900: "#111827",
      },
      indigo: {
        400: "#818cf8",
        500: "#5453E0",
      },
      blue: {
        400: "#60a5fa",
        500: "#3b82f6",
      },
      red: {
        300: "#fca5a5",
        500: "#ef4444",
        600: "#dc2626",
        900: "#7f1d1d"
      },
      yellow: {
        300: "#fde047",
        900: "#713f12"
      },
      purple: {
        400: "#c084fc",
      },
      pink: {
       400:  "#f472b6",
      }
    },
    extend: {},
  },
  plugins: [],
};
