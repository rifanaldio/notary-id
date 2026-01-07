/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1B264F',
          primary: '#276EF1',
          light: '#F8F9FA',
          surface: '#FFFFFF',
          muted: '#6C757D'
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444'
        }
      }
    }
  },
  plugins: []
}

