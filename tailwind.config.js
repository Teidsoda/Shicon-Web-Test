/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        shicons: {
          primary: "#0040A0",
          hover: "#004DA0",
          navy: "#00306E",
          deep: "#07182E",
          red: "#ED1C24",
          "red-hover": "#d0141b",
          dark: "#111111",
          heading: "#222222",
          muted: "#666666",
          light: "#F5F5F5",
          footer: "#F2F2F2",
          border: "#E5E5E5",
        },
      },
      fontFamily: {
        heading: ["var(--font-be-vietnam)", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      borderRadius: {
        btn: "2px",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};
