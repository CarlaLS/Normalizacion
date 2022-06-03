
const Contenedor = require('../classes/contenedor')
const sqlite3Config = require('../Config/SQLite3')
const SqlClient = new Contenedor(sqlite3Config, 'messages')


const controllerMensajes = {

  createMessagesTable: async () => {
    try {
      await SqlClient.createTable()
    } catch (error) {
      console.log(error)
    }
  },

  getAllMessages: async () => {
    try {
      const allMessages = await SqlClient.getAll()
      return allMessages
    } catch (error) {
      console.log(error)
    }
  },

  addNuevoMensaje: async (mensaje) => {
    try {
      const previMensajes = await SqlClient.getAll()
      const currentDate = new Date().toLocaleString()

      const getNuevoId = () => {
        let ultimoID = 0
        if (previMensajes.length) {
          ultimoID = previMensajes[previMensajes.length - 1].id
        }
        return ultimoID + 1
      }

      const nuevoMensaje = {
        id: getNuevoId(),
        email: mensaje.email ? mensaje.email : 'user@email.com',
        date: currentDate,
        messageText: mensaje.messageText ? mensaje.messageText : '(Mensaje Vacio)',
      }

      await SqlClient.add(nuevoMensaje)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },
}


module.exports = controllerMensajes
