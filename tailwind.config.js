/** @type {import('tailwindcss').Config} */

// Colors available in the Dato project
const colors = 'gray|red|orange|yellow|green|teal|blue|indigo|purple|pink'

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
      pattern: new RegExp(`^bg-(${colors})-(700|900)$`),
      variants: ['hover'],
    },
    {
      pattern: new RegExp(`^border-(${colors})-(500)$`),
    },
    {
      pattern: new RegExp(`^text-(${colors})-(700)$`),
      variants: ['hover'],
    },
  ],
}
