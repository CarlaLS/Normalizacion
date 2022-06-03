
const Contenedor = require('../classes/contenedor')
const mariaDBConfig = require('../Config/mariaDB')
const SqlClient = new Contenedor (mariaDBConfig, 'productos')
const { generarNuevoId, generarNuevoProducto } = require('../Utils/generadorProductos')


const controllerProductos ={


  cargarDatosIniciales: async () => {
    try {
      await SqlClient.Load()
    } catch (error) {
      console.log(error)
    }
  },

  populate: async (cant = 5) => {
    try {
      const fakeProductos = []
      for (let i = 0; i < cant; i++) {
        const nuevoProducto = generarNuevoProducto(generarNuevoId())
        await SqlClient.addItem(nuevoProducto)
        fakeProductos.push(nuevoProducto)
      }
      console.log('fakeProductos', fakeProductos)
      return fakeProductos
    } catch (error) {
      console.log(error)
    }
  },
  
  getAllProductos: async ( ) => {
    try {
      const todosProductos = await SqlClient.getAll()
      return todosProductos
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },


  addNuevoProducto: async (producto) => {
   
    try {
      const previProductos = await productosDB.getAll()
      const noImage =
        'https://cdn4.iconfinder.com/data/icons/basic-ui-element-flat-style/512/Basic_UI_Elements_-_2.3_-_Flat_Style_-_36-02-64.png'
      

        const isValidURL = (imageURL) => {
          let url
          try {
            url = new URL(imageURL)
          } catch (_) {
            return false
          }
          return url.protocol === 'http:' || url.protocol === 'https:'
        }

        const getNuevoId = () => {
          let ultimoID = 0
          if (previProductos.length) {
            ultimoID = previProductos[previProductos.length - 1].id
          }
          return ultimoID + 1
        }
  
        const nuevoProducto = {
        id: getNuevoId(),
        title: producto.title ? producto.title : 'No Title',
        price: producto.price ? producto.price : 0,
        thumbnail: isValidURL(producto.thumbnail) ? producto.thumbnail : noImage,
      }
  
      await SqlClient.add(nuevoProducto)
  
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },
}

module.exports=controllerProductos