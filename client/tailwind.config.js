module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        "max-lg": { max: "1024px" },
        "max-med": { max: "765px" },
        "max-md": { max: "658px" },
        "max-small": { max: "500px" },
        "max-sm": { max: "400px" },
      },
      colors: {
        TXT: "#000000",
        BG: "#ffffff",
        PR_BTN: "#93dc99",
        SC_BTN: "#ecf9f3",
        ACT: "#46c38f",
      },
      animation: {
        moveBorder: "moveBorder 0.3s forwards",
      },
      keyframes: {
        moveBorder: {
          "0%": {
            transform: "scaleX(0)",
            "transform-origin": "left",
          },
          "100%": {
            transform: "scaleX(1)",
            "transform-origin": "left",
          },
        },
      },
    },
  },
  plugins: [],
};
