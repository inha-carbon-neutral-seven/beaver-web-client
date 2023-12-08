/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "1/3": "30%",
        "2/3": "70%",
      },
    },
  },
  plugins: [],
};
