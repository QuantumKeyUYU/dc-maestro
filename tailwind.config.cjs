/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          app: '#0b1220',
          surface: '#0d121a',
          surfaceSoft: '#121c2c'
        },
        border: {
          subtle: '#1b2537'
        },
        accent: {
          primary: '#3eece2',
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
          muted: '#cdd6e8',
          dim: '#93a2bd'
        }
      },
      boxShadow: {
        soft: '0 16px 60px -30px rgba(0, 0, 0, 0.78)',
        lifted: '0 28px 70px -32px rgba(0, 0, 0, 0.8)',
        ambient: '0 25px 80px -48px rgba(0, 0, 0, 0.9), 0 1px 0 0 rgba(255, 255, 255, 0.02)',
        glow: '0 18px 50px -26px rgba(62, 236, 226, 0.5)',
        focus: '0 0 0 1px rgba(62, 236, 226, 0.35), 0 10px 40px -24px rgba(124, 140, 251, 0.45)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif']
      }
    }
  },
  plugins: []
};
