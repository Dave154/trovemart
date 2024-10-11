module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#E51E54',
      },
      gridTemplateColumns: {
        'auto-fit-sm': 'repeat(auto-fit, minmax(150px, 1fr))',
        'auto-fit-md': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
    },
  },
  plugins: [],
};