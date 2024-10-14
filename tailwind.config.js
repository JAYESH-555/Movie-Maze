/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          color1: "#4B0082",      // Dark violet for accents
          color2: "#FFD700",      // Soft gold for vibrant accents
          color3: "#9370DB",      // Pastel violet for light contrast
          color4: "#FFFACD",      // Pale yellow for background or highlights
        },
      },
    },
    plugins: [],
  };