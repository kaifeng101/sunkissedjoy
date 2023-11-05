/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fcb440",
      },
      screens : {
        xs : "450px"
      }
    },
    
  },
  plugins: [],
};
