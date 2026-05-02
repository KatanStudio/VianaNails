/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'viana-pink':   '#e24a71',
        'viana-coral':  '#e66554',
        'viana-orange': '#f29d56',
        'viana-gold':   '#f7bc58',
        'viana-dark':   '#1A1B21',
        'viana-cream':  '#fdf8f5',
      },
      fontFamily: {
        display: ['"Winterhome"', '"Dancing Script"', 'cursive'],
        body:    ['"Raleway"', 'sans-serif'],
      },
      backgroundImage: {
        'viana-gradient': 'linear-gradient(135deg, #e24a71 0%, #e66554 50%, #f7bc58 100%)',
      },
    },
  },
  plugins: [],
}
