/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#20B2AA',
        secondary: '#9B59B6',
        accent: '#FF6B6B',
        background: '#f9f9f9',
        'light-blue': '#1E90FF',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};