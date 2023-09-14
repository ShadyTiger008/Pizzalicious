import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        themeRed: "#F54748",
        varPink: "#FDECEC",
      },
    },
  },
  plugins: [],
} satisfies Config;
