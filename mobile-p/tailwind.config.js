/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1E1E1E",
      },
      fontFamily: {
        regular: "Inter_400Regular",
        semibold: "Inter_600SemiBold",
        bold: "Inter_700Bold",
        extrabold: "Inter_800ExtraBold",
      },
    },
  },
  plugins: [],
};
