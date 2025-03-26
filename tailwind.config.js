/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fira: ['"Fira Sans"', 'sans-serif'],
        belanosima: ['"Belanosima"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        roboto: ['"Roboto"', 'sans-serif'],
      },
    },
    screens: {
      'xs': {'max': '320px'},
      'sm': {'min': '321px', 'max': '636px'},
      'md': {'min': '768px'},
      'lg': {'min': '1024px'},
      'xl': {'min': '1280px'},
      '2xl': {'min': '1536px'},
    },
  },
  plugins: [],
}