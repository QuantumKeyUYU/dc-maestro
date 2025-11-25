/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          base: '#05070B',
          soft: '#070A0F',
          card: '#0B0F16',
          raised: '#101621'
        },
        text: {
          primary: '#EEF2F7',
          secondary: '#B3B9C7',
          muted: '#7A828E'
        },
        accent: {
          primary: '#4CB5F5',
          soft: '#102030',
          violet: '#8B9BFF',
          azure: '#4CB5F5'
        },
        status: {
          ok: '#46B37A',
          warn: '#E2B857',
          danger: '#E05757'
        },
        base: {
          950: '#05070B',
          900: '#070A0F',
          850: '#0B0F16',
          800: '#101621'
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
