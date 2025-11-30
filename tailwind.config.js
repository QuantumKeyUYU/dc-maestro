// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",             // App.tsx, index.tsx и т.п. в корне
    "./components/**/*.{js,ts,jsx,tsx}", // все компоненты в папке components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
