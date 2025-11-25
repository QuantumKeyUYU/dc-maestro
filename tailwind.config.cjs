/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#020617',
          900: '#02081f',
          800: '#050b24',
          700: '#0b1220'
        },
        accent: {
          DEFAULT: '#22d3ee',
          soft: '#0b3b4a'
        },
        neutral: {
          100: '#e5e7eb',
          300: '#9ca3af',
          500: '#6b7280',
          700: '#4b5563'
        },
        status: {
          ok: '#22c55e',
          warn: '#eab308',
          danger: '#f97316'
        }
      },
      borderRadius: {
        xl: '0.9rem',
        '2xl': '1.2rem'
      },
      boxShadow: {
        'luxe-card': '0 18px 45px rgba(0,0,0,0.55)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif']
      }
    }
  },
  plugins: []
};
