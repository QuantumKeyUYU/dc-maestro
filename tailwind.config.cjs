/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          0: '#05070A',
          1: '#0A0F16',
          2: '#0D131D',
          3: '#111A26'
        },
        text: {
          primary: '#EAF1FF',
          secondary: '#B8C3D9',
          muted: '#7E8BA7'
        },
        accent: {
          primary: '#4FB4FF'
        },
        status: {
          ok: '#3BD8A1',
          warn: '#F2C063',
          danger: '#FF5C67'
        }
      },
      borderRadius: {
        xl: '0.9rem',
        '2xl': '1.2rem'
      },
      boxShadow: {
        'luxe-card': '0 20px 60px rgba(0,0,0,0.55)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif']
      }
    }
  },
  plugins: []
};
