export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#0ac5a8',
          dark: '#2c3d5b',
          slate: '#879cb9',
          light: '#e9edef',
        },
      },
    },
  },
  plugins: [],
}
