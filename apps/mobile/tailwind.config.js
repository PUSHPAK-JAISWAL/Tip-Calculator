/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: "#F6F1E8",
        paper: "#EDE6D9",
        foam: "#FFFBF5",
        espresso: "#2C2118",
        ink: "#1A1410",
        copper: "#B85C38",
        sage: "#5C6B52",
        rust: "#8C3A28",
      },
      fontFamily: {
        display: ["Fraunces_700Bold"],
        "display-italic": ["Fraunces_700Bold_Italic"],
        sans: ["Outfit_400Regular"],
        "sans-medium": ["Outfit_500Medium"],
      },
    },
  },
  plugins: [],
};
