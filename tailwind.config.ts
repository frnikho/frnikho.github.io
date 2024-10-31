import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      scale: {
        '60': '0.60'
      },
      borderWidth: {
        '1': '1px'
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
      },
      colors: {
        'white-pastel': '#F4F3EE',
        'blue-pastel': '#BDD2E5',
        'red-pastel': '#FA9189',
        'green-pastel': '#B3F5BC',
        'primary-text': '#303030',
        'primary-text-dark': '#FEFEFE',
        'card-background': '#EBEBEB',
        'dark': '#1c1c1c',
        'card-icon': '#E4E4E4',
        'input': '#D9D9D9',
        'darkblue-pastel': '#71BAFF',
      },
      fontFamily: {
        prompt: ['var(--font-prompt)']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
