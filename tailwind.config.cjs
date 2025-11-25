/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#0A0D12',
          900: '#0D1117',
          850: '#11161F',
          800: '#161B23'
        },
        text: {
          primary: '#E6E7EB',
          secondary: '#9EA3AE',
          muted: '#6B7280'
        },
        accent: {
          azure: '#3ECBF8',
          violet: '#7D8CFF'
        },
        status: {
          ok: '#4CC38A',
          warn: '#F5A524',
          danger: '#F33F3F'
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
