module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {screens : {
      'max-lg': {max: '1024px'},
      'max-med':{max: '765px'},
      'max-md': {max: '658px'},
      'max-small': {max: '500px'},
      'max-sm': {max: '400px'}
    }},
  },
  plugins: [],
}

