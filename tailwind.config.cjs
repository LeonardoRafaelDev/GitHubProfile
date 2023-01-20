/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/*.{js,html,css}", "./src/pages/*.{js,html,css}", "./pages/*.{js,html,css}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
