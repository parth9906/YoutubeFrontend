/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
      transitionDuration: {
        'default': '150ms',
      },
      transitionTimingFunction: {
        'default': 'ease-in-out',
      },
    },
  },
  plugins: [
   
  ],
  
}

