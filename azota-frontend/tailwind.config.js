/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        success: "rgb(var(--color-success))",
        darkmode: {
          100: "rgb(var(--color-darkmode-100) / <alpha-value>)",
          200: "rgb(var(--color-darkmode-200) / <alpha-value>)",
          300: "rgb(var(--color-darkmode-300) / <alpha-value>)",
          400: "rgb(var(--color-darkmode-400) / <alpha-value>)",
          500: "rgb(var(--color-darkmode-500) / <alpha-value>)",
          600: "rgb(var(--color-darkmode-600) / <alpha-value>)",
          700: "rgb(var(--color-darkmode-700) / <alpha-value>)",
          800: "rgb(var(--color-darkmode-800) / <alpha-value>)",
          900: "rgb(var(--color-darkmode-900) / <alpha-value>)",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            h1: { fontSize: "2.25rem", fontWeight: "700", color: "#1a202c" },
            h2: { fontSize: "1.875rem", fontWeight: "600", color: "#2d3748" },
            h3: { fontSize: "1.5rem", fontWeight: "500", color: "#4a5568" },
          },
        },
      },
    },
  },
  plugins: [],
};
