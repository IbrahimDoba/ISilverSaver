module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {screens : {
      'max-lg': {max: '1024px'},
      'max-md': {max: '658px'},
      'max-sm': {max: '400px'}
    }},
  },
  plugins: [],
}

