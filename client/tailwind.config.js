/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'royal-green':'#a3e635',
        'regal-blue':'#020712',
        'con-blue':'#161a23'
      },
      fontFamily:{
        'graduate':['Graduate','serif'],
        'montez':['Montez','cursive'],
        'barlow':['Barlow','sans-serif'],
      },
    },
  },
  plugins: [],
}

