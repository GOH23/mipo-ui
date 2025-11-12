/** @type {import('tailwindcss').Config} */
module.exports = {
  // ВАЖНО: укажите пути ко всем файлам компонентов
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}