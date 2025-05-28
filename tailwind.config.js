// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // make sure this covers your actual source files
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "1370px", // 👈 this must override default 768px
      lg: "1440px",
      xl: "1600px",
    },
    extend: {},
  },
  plugins: [],
};
