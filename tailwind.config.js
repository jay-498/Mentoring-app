const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        opacitywhite: "rgba(255, 255, 255, 0.7)",
      },
      lineHeight: {
        64: "64px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        Helvetica: ["Helvetica"],
        Avenir: ["avenir-next-lt-pro"],
        Monteserat: ["Montserrat", "sans-serif"],
        nunito: ["Nunito"],
        AvenirNext: ["Avenir Next LT Pro"],
        Manrope: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
