/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "neutral-500": "#817D82",
      },
    },
  },
  plugins: [],
  safelist: ["bg-neutral-500", "text-neutral-500"],
};
