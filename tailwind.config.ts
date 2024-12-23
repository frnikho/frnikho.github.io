import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'rotate-infinite-quick': 'rotate 10s linear infinite',
        'rotate-infinite': 'rotate 20s linear infinite',
        'rotate-infinite-slow': 'rotate 30s linear infinite',
      },
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
        'card-background': '#ececec',
        'dark-card-background': '#343434',
        'dark': '#1c1c1c',
        'card-icon': '#E4E4E4',
        'input': '#D9D9D9',
        'dark-input': '#5A5A5A',
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
  plugins: [
      function ({addVariant}: PluginAPI) {
        addVariant('firefox', ':-moz-any(&)');
      }
  ],
};
export default config;
