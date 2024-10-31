module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#E51E54',
        popup: 'rgba(255,255,255,.1)',
      },
      gridTemplateColumns: {
        'auto-fit-sm': 'repeat(auto-fit, minmax(150px, 1fr))',
        'auto-fit-md': 'repeat(auto-fit, minmax(200px, 1fr))',
         'auto-fit-lg': 'repeat(auto-fit, minmax(300px, 1fr))'
      },
        fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        custom: ['CustomFont', 'sans-serif'], // For self-hosted font
      },
       backgroundImage: {
        'wave': "url('./src/assets/wave.svg')",
      }
    },
  },
};