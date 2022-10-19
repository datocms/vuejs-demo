/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /^bg-(gray|red|orange|yellow|green|teal|blue|indigo|purple|pink)-(700|900)$/,
      variants: ['hover'],
    },
  ],
}