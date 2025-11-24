/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        surface: '#111827',
        primary: '#38bdf8',
        accent: '#a855f7',
        warning: '#f59e0b',
        danger: '#ef4444',
        success: '#22c55e'
      }
    }
  },
  plugins: []
};
