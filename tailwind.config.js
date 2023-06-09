/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,css}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fff',
        secondary: '#fafafa',
        tertiary: '#e5e7eb',
        dark: '#000',
        green: '#196e0c', //green for validation
        blue: '#354b60',
        lightGrey: '#e5e5e5',
        grey: '#7c8a98',
        brand: '#9c71b3',
        darkBrand: '#7869a2',
        red: '#ef4444', // red for errors
      },
    },
  },
  plugins: [],
};
