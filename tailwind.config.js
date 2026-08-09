module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // Habilita o modo escuro manual ou via classe
  theme: {
    extend: {
      colors: {
        // Cores personalizadas inspiradas no design imersivo das referências
        darkBg: "#0b0f19",
        cardBg: "#111827",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};