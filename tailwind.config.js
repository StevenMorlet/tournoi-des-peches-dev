/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        arcade: ['var(--font-arcade)'],
        digital: ['var(--font-digital)'],
        display: ['var(--font-display)'],
        game: ['var(--font-game)'],
        compact: ['var(--font-game-compact)'],
      },
    },
  },
  plugins: [],
};
