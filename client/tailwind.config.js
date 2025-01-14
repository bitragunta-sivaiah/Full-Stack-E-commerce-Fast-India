/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif']
      },
      colors: {
        "primary-blue": "#002e5d",
        "primary-orange": "#ff6f00",
        "secondary-gray": "#f5f5f5",
        "secondary-skyblue": "#00bfff",
        "text-gray": "#333333",
        "text-black": "#000000",
        "accent-green": "#32cd32",
        "accent-yellow": "#ffd700",
        "bg-light-cream": "#fffdd0",
        "bg-white": "#ffffff"
      }
    },
  },
  plugins: [],
}
