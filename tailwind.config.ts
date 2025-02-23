import type { Config } from "tailwindcss";

const colors = {
  color1: "#5C2D2D",
  color2: "#FF48B6",
  color3: "#FFA740",
  color4: "#07B704",
  dark1: "#000000",
  light1: "#ffffff",
  light2: "#F7F7F9",
  light3: "#E4E6EB",
};

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/assets/images/*.svg",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      fill: { ...colors },
      fontFamily: {
        sans: ["'Poppins', sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
