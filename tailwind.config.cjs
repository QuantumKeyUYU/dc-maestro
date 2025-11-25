/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          bg: '#05070B',
          panel: '#070B11',
          panelSoft: '#0A0F16'
        },
        accent: {
          primary: '#4FB4FF',
          primarySoft: '#8CD1FF',
          primaryDark: '#2E7AC2'
        },
        semantic: {
          danger: '#FF5C67',
          warning: '#F2C063',
          success: '#3BD8A1'
        },
        text: {
          primary: 'rgba(255,255,255,0.94)',
          secondary: 'rgba(255,255,255,0.68)',
          muted: 'rgba(255,255,255,0.42)'
        },
        border: {
          soft: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.14)'
        }
      },
      borderRadius: {
        card: '18px',
        capsule: '9999px',
        header: '20px'
      },
      boxShadow: {
        'elevation-card': '0 22px 60px rgba(0,0,0,0.68)',
        'elevation-shell': '0 30px 80px rgba(0,0,0,0.82)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif']
      }
    }
  },
  plugins: []
};
