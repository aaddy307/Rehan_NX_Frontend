const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#b90015',
        primaryContainer: '#e8001d',
        accent: '#e8001d',
        secondary: '#b71422',
        secondaryContainer: '#db3237',
        background: '#f9f9fb',
        surface: '#ffffff',
        onBackground: '#1a1c1d',
        onSurface: '#1a1c1d',
        mutedText: '#5e3f3b',
        outline: '#936e6a',
        outlineVariant: '#e9bcb7',
        white: '#ffffff',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        headline: ['var(--font-headline)'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
    },
  },
  outputFileTracingRoot: __dirname,
  plugins: [],
}