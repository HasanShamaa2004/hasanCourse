/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // استخدام src إذا كنت تستخدم هيكل src
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A2E66",
        secondary: "#FBB040",
        lightGray: "#F3F3F3",
        white: "#FFFFFF",
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        secondary: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
