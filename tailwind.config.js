module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"]
      },
      colors: {
        "light-gray": "rgb(var(--light-gray) / <alpha-value>)",
        gray: "rgb(var(--gray) / <alpha-value>)",
        red: "rgb(var(--red) / <alpha-value>)",
        blue: "rgb(var(--blue) / <alpha-value>)",
        dark: "rgb(var(--dark) / <alpha-value>)",
        white: "#fff",

        transparent: "transparent"
      }
    }
  },
  plugins: []
};
