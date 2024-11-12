/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // custom colors
        "primary-black": "#232323",
        "primary-white": "#F8FAFC",
        "secondary-1": "#334A55",
        "secondary-2": "#758888",
        "foundation-primary-white-darker": "#575858",
        "foundation-white-hover": "#dfe1e3",
        lightGray: "rgba(0, 0, 0, 0.05)",
        footerBg: "rgba(38, 50, 56, 0.06)",
        danger: "#DC4C64",
        success: "#4bb543",
      },
      fontFamily: {
        "uncut-sans": ["var(--font-uncut-sans)"],
      },
      transitionTimingFunction: {
        "in-out-circ": "cubic-bezier(0.85, 0, 0.15, 1)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },

      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
