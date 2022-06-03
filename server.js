
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const controllerProductos = require('./Controllers/controllerProductos')
const controllerMensajes = require('./Controllers/controllerMensajes')
const engine = require('express-handlebars').engine


const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


const handlebarsConfig = {
  extname: '.hbs',
  defaultLayout: 'index.html',
}
app.engine('.hbs', engine(handlebarsConfig))
app.set('view engine', '.hbs')

app.set('views', 'src/views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//ROUTES 
app.use('/test', async (req, res) => {
  try {
    console.log('Estoy en el servidor')
    const todosProductos = await controllerProductos.populate()
    console.log(todosProductos)
    res.sendFile(process.cwd() + '/public/index.html')
  } catch (error) {
    console.log(error)
  }
})

app.use('/', (req, res) => {
  try {
    res.sendFile(process.cwd() + '/public/index.html')
  } catch (error) {
    console.log(`ERROR: ${error}`)
  }
})

//SOCKET IO
io.on('connection', (socket) => {
  socket.emit('socketConectedo')

  socket.on('listaProductos', async () => {
    const todosProductos = await controllerProductos.getAllProductos()
    socket.emit('updateListaProductos', todosProductos)
  })

  socket.on('chatMensajes', async () => {
    const todosMensajes = await controllerMensajes.getAllMensajes()
    socket.broadcast.emit('updateChat', todosMensajes)
  })

  socket.on('addNuevoProducto', async (nuevoProducto) => {
    await controllerProductos.addNuevoProducto(nuevoProducto)
    const todosProductos = await controllerProductos.getAllProductos()
    socket.emit('updateListaProductos', todosProductos)
  })

  socket.on('addNuevoMensaje', async (nuevoMensaje) => {
    await controllerMensajes.addNuevoMensaje(nuevoMensaje)
    const todosMensajes = await controllerMensajes.getAllMensajes()
    socket.broadcast.emit('updateChat', todosMensajes)
  })
})


const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${server.address().port}/`)
})
server.on('error', (error) => console.log(`Server error: ${error}`))
