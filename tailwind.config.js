/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Include Angular files for Tailwind scanning
  ],
  theme: {
    extend: {}, // Extend default styles if needed
  },
  plugins: [], // Add Tailwind plugins if required
};
