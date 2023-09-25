/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        header: "64px",
        playcard: "72px",
        "header-search": "440px",
        "sidebar-width-expand": "240px",
        "sidebar-width-narrow": "72px",
      },
      colors: {
        "white-opacity-10": "#ffffff10",
        "white-opacity-15": "#ffffff15",
        "white-opacity-17": "#ffffff17",
        "white-opacity-20": "#ffffff20",
        "white-opacity-25": "#ffffff25",
        "white-opacity-30": "#ffffff30",
        "border-bottom-color": "#1d1d1d",
        "main-bg": "#030303",
        "from-body-bg-gradiant": "rgba(0,0,0,0.75)",
        "from-body-bg-gradiant-l": "rgba(0,0,0,0.85)",
        "from-body-bg-gradiant-l1": "rgba(0,0,0,0.35)",
        "to-body-bg-gradiant": "#000000",
        purple: "#6626f9",
        turquoise: "#43bcff",
        blue: "#5865fc",
        blueL: "#3c92ff",
        whiteT1: "#ffffffB3",
        bdm: "#ffffff33",
        whv: "#ffffff1a",
        whv1: "#ffffff2a",
        whv1nop: "#444444",
        grayL: "#212121",
        grayL2: "#353535",
      },
      backgroundImage: {
        "body-bg": "url('/static/assets/bg/body-bg.jpg')",
      },
      flex: {
        a2: "2",
        a3: "3",
      },
      transitionProperty: {
        top: "top",
        border: "border",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        fadeOut: {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        zomOutControlThumB: {
          "0%": {
            opacity: 1,
            height: "80px",
            width: "80px",
            transform: "scale(1)",
            // border: "1px solid rgba(255,255,255,0.4)",
          },
          "100%": {
            opacity: 0,
            height: "80px",
            width: "80px",
            transform: "scale(2)",
            // border: "1px solid rgba(255,255,255,0.4)",
          },
        },
      },
      animation: {
        zomOutControlThumB: "zomOutControlThumB 0.5s ease-in-out",
        fadeIn: "fadeIn 0.3s ease-in-out",
        fadeOut: "fadeOut 0.3s ease-in-out",
      },
    },
  },

  plugins: [],
}
