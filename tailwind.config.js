/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: { xs: "400px" },
      colors: {
        ink: "#0F0E0D", // primary black
        coal: "#191714", // raised black surfaces
        char: "#26231F",
        cream: "#F3EDE3", // text on black
        stone: "#F8F5F0", // page background
        sand: "#EFE8DD",
        line: "#E3DACC",
        muted: "#6B635A",
        gold: { DEFAULT: "#C4A062", light: "#DCC08C", dark: "#87652F" },
        wa: { DEFAULT: "#1FAF5A", dark: "#178F49" },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Jost", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
