/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'Davy': "#595959",
        'Battleship': "#808F85",
        'Celadon': "#91C499",
        'Linen': "#F2E9DC",
        'Pear': "#CFD11A",
      }
    },
  },
  plugins: [],
}

