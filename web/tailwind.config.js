/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        background: "#09090A",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0,1fr))",
      },
    },
  },
  plugins: [],
};
