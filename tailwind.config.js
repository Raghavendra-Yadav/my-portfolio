/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // Next.js pages
    "./components/**/*.{js,ts,jsx,tsx}", // Next.js components
    "./app/**/*.{js,ts,jsx,tsx}", // If using App Router (Next.js 13+)
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        "roboto-slab": ["Roboto Slab", "serif"],
      },
    },
  },
  plugins: [],
};
