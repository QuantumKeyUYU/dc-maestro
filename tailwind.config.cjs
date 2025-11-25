/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          0: '#0A0F14',
          1: '#0F141A',
          2: '#121820',
          3: '#1A222C'
        },
        text: {
          primary: '#EEF2F7',
          secondary: '#B3B9C7',
          muted: '#7A828E'
        },
        accent: {
          primary: '#33A7FF',
          secondary: '#6C82FF',
          positive: '#27C48F',
          warning: '#D9A63A',
          danger: '#C94A4A'
        },
        status: {
          ok: '#27C48F',
          warn: '#D9A63A',
          danger: '#C94A4A'
        }
      },
      borderRadius: {
        xl: '0.9rem',
        '2xl': '1.2rem'
      },
      boxShadow: {
        'luxe-card': '0 8px 24px rgba(0,0,0,0.45)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif']
      }
    }
  },
  plugins: []
};
