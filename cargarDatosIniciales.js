const knex = require('knex')
const mariaDBConfig = require('./src/Config/mariaDB')
const mariaDBClient = knex(mariaDBConfig)

const productosInicial = [
  {
    id: 1,
    title: 'Escuadra',
    price: 45,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-64.png',
  },
  {
    id: 2,
    title: 'Calculadora',
    price: 120.5,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-64.png',
  },
  {
    id: 3,
    title: 'Globo Terráqueo',
    price: 275,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-64.png',
  },
]

mariaDBClient('productos')
  .insert(productosInicial)
  .then(() => console.log('Datos iniciales ingresados!'))
  .catch((error) => {
    console.log(error)
  })
  .finally(() => {
    mariaDBClient.destroy()
  })