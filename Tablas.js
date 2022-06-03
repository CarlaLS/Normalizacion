const knex = require('knex')
const mariaDBConfig = require('./src/Config/mariaDB')
const mariaDBClient = knex(mariaDBConfig)
const sqlite3Config = require('./src/Config/SQLite3')
const sqlite3Client = knex(sqlite3Config)

mariaDBClient.schema
  .hasTable('productos')
  .then((exists) => {
    if (!exists) {
      mariaDBClient.schema
        .createTable('productos', (table) => {
          table.increments('id').primary()
          table.string('title', 100).notNullable()
          table.float('price').notNullable()
          table.string('thumbnail', 500)
        })
        .then(() => {
          console.log('La tabla ha sdo creadad!')
        })
      mariaDBClient('productos')
        .insert(productosInicial)
        .then(() => console.log('Datos iniciales ingresados!'))
        .catch((error) => {
          console.log(error)
        })
    } else {
      console.log('La tabla ya existe.')
    }
  })
  .finally(() => {
    mariaDBClient.destroy()
  })


sqlite3Client.schema
  .hasTable('messages')
  .then((exists) => {
    if (!exists) {
      sqlite3Client.schema
        .createTable('messages', (table) => {
          table.increments('id').primary()
          table.string('email', 80).notNullable()
          table.string('date', 50).notNullable()
          table.string('messageText', 1000).notNullable()
        })
        .then(() => {
          console.log('Tabla creada!')
        })
    } else {
      console.log('La tabla ya existe.')
    }
  })
  .finally(() => {
    sqlite3Client.destroy()
  })