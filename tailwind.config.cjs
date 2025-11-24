/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          shell: '#0b111a',
          surface: '#101720',
          surfaceSoft: '#131c26',
          surfaceMuted: '#19232e'
        },
        border: {
          subtle: 'rgba(255,255,255,0.07)',
          muted: 'rgba(255,255,255,0.05)'
        },
        accent: {
          primary: '#4fae8c',
          muted: '#6c88cb'
        },
        status: {
          ok: '#4fae8c',
          warning: '#d1a048',
          danger: '#b95a5a',
          neutral: '#6c88cb'
        },
        text: {
          primary: '#dfe6f2',
          muted: '#b4becf',
          dim: '#8a95ab'
        }
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0,0,0,0.25)',
        ambient: '0 2px 8px -2px rgba(0,0,0,0.32)',
        focus: '0 0 0 1px rgba(79,174,140,0.4)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif']
      }
    }
  },
  plugins: []
};
