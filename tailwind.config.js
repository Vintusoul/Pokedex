/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
        serif: ["ui-serif", "Georgia"],
        mono: ["ui-monospace", "SFMono-Regular"],
        display: ["Oswald"],
        pokemon: ["'Indie Flower', cursive"],
        body: ['"Open Sans"'],
      },
      colors: {
        "pokemon-light-blue": "#2a75bb",
        "pokemon-dark": "#243c5a",
      },
    },
  },
  plugins: [],
};
