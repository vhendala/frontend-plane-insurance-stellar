/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stellar-yellow': '#FDDA24',
        'stellar-blue': '#00A7B5',
        'stellar-dark': '#002E5D',
        'stellar-purple': '#B7ACE8',
      },
    },
  },
  plugins: [],
}
