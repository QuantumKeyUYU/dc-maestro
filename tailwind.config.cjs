/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          app: '#0b1224',
          surface: '#0f192b',
          surfaceSoft: '#16233a'
        },
        border: {
          subtle: '#1f2b3f'
        },
        accent: {
          primary: '#5de4c7',
          muted: '#7c8cfb'
        },
        status: {
          success: '#34d399',
          warning: '#fbbf24',
          danger: '#f87171',
          info: '#60a5fa'
        },
        text: {
          primary: '#e5eaf3',
          muted: '#b5c0d8',
          dim: '#7b87a1'
        }
      },
      boxShadow: {
        soft: '0 12px 40px -24px rgba(0, 0, 0, 0.65)',
        lifted: '0 16px 60px -30px rgba(0, 0, 0, 0.7)',
        focus: '0 0 0 1px rgba(93, 228, 199, 0.25), 0 10px 40px -24px rgba(124, 140, 251, 0.45)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif']
      }
    }
  },
  plugins: []
};
