const { faker } = require('@faker-js/faker')
faker.locale = 'es'

let id = 1
function generarNuevoId() {
  return id++
}

function generarNuevoProducto(id) {
  return {
    id,
    title: faker.shirt.shirt(),
    price: faker.commerce.price(5500, 7000),
    thumbnail: faker.image.shirt(),
  }
}

module.exports = { generarNuevoId, generarNuevoProducto }