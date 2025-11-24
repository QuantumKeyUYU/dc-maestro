/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          shell: '#05080c',
          surface: '#0c1119',
          surfaceSoft: '#101724',
          surfaceMuted: '#111a28'
        },
        border: {
          subtle: 'rgba(255,255,255,0.08)',
          muted: 'rgba(255,255,255,0.05)'
        },
        accent: {
          primary: '#4fb7ad',
          muted: '#6f87c3'
        },
        status: {
          ok: '#2a8f7a',
          warning: '#b8893a',
          danger: '#a6555c',
          neutral: '#6f7f98'
        },
        text: {
          primary: '#dde7f5',
          muted: '#b8c3d6',
          dim: '#8e9ab4'
        }
      },
      boxShadow: {
        soft: '0 10px 26px -18px rgba(0, 0, 0, 0.55)',
        lifted: '0 16px 32px -22px rgba(0, 0, 0, 0.55)',
        ambient: '0 16px 42px -28px rgba(0, 0, 0, 0.65), 0 1px 0 0 rgba(255, 255, 255, 0.02)',
        glow: '0 8px 22px -18px rgba(79, 183, 173, 0.28)',
        focus: '0 0 0 1px rgba(79, 183, 173, 0.38), 0 8px 28px -22px rgba(111, 135, 195, 0.35)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif']
      }
    }
  },
  plugins: []
};
