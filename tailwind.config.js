/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      // you can configure the container to be centered
      center: true,

      // default breakpoints but with 40px removed
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1156px",
      },
    },
    extend: {
      colors: {
        "neutral-500": "#817D82",
      },
    },
  },
  plugins: [],
  safelist: ["bg-neutral-500", "text-neutral-500"],
};
