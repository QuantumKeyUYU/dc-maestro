/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          app: '#080c12',
          surface: '#0b1118',
          surfaceSoft: '#0f1622'
        },
        border: {
          subtle: '#111826'
        },
        accent: {
          primary: '#3fb1a5',
          muted: '#6f7fbf'
        },
        status: {
          success: '#2a8f73',
          warning: '#c99a46',
          danger: '#a84f59',
          info: '#4d8ccf'
        },
        text: {
          primary: '#d2dae6',
          muted: '#b7c3d4',
          dim: '#8691a7'
        }
      },
      boxShadow: {
        soft: '0 12px 30px -18px rgba(0, 0, 0, 0.55)',
        lifted: '0 20px 50px -28px rgba(0, 0, 0, 0.6)',
        ambient: '0 18px 48px -30px rgba(0, 0, 0, 0.7), 0 1px 0 0 rgba(255, 255, 255, 0.02)',
        glow: '0 12px 32px -20px rgba(63, 177, 165, 0.35)',
        focus: '0 0 0 1px rgba(63, 177, 165, 0.35), 0 8px 32px -24px rgba(79, 140, 207, 0.35)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif']
      }
    }
  },
  plugins: []
};
