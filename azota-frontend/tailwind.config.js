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
