/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          shell: '#05070b',
          surface: '#0b1018',
          surfaceSoft: '#0f1521',
          surfaceMuted: '#101826'
        },
        border: {
          subtle: 'rgba(255,255,255,0.06)',
          muted: 'rgba(255,255,255,0.04)'
        },
        accent: {
          primary: '#5bc8be',
          muted: '#6f86c1'
        },
        status: {
          ok: '#2c9b7f',
          warning: '#c6933a',
          danger: '#b35c63',
          neutral: '#6b7a95'
        },
        text: {
          primary: '#d8e2f0',
          muted: '#b6c1d3',
          dim: '#8d99b1'
        }
      },
      boxShadow: {
        soft: '0 12px 30px -18px rgba(0, 0, 0, 0.55)',
        lifted: '0 18px 36px -24px rgba(0, 0, 0, 0.55)',
        ambient: '0 18px 48px -32px rgba(0, 0, 0, 0.7), 0 1px 0 0 rgba(255, 255, 255, 0.02)',
        glow: '0 10px 24px -18px rgba(91, 200, 190, 0.3)',
        focus: '0 0 0 1px rgba(91, 200, 190, 0.35), 0 8px 32px -24px rgba(111, 134, 193, 0.35)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif']
      }
    }
  },
  plugins: []
};
