module.exports = {
    client: 'sqlite3',
    connection: {
      filename: process.cwd() + '/src/database/productos.sqlite',
    },
    useNullAsDefault: true,
  }