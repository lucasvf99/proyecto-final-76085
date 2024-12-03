import express from 'express'
import __dirname from './utils.js'
//motor de plantilla + dinamismo
import handlebars from 'express-handlebars'
import {Server, Socket} from 'socket.io'
//router
import viewsRouter from './router/views.routes.js'
//productmanager
import ProductsManager from './services/productsManager.js'

const app = express()
const PORT = 8085

//manager
const productmanager = new ProductsManager()

//config
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//motor hdb
app.engine('handlebars', handlebars.engine())
//carpeta views
app.set('views', __dirname + '/views')
//indicamos motor
app.set('view engine', 'handlebars')


//public
app.use(express.static( __dirname + '/public'))


app.use('/products', viewsRouter)




const httpServer = app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})

//instanciamos socket.io
const socketServer = new Server(httpServer)   

let productos = []

socketServer.on('connection', async socket => {

   let dataProducts = await productmanager.getProducts()
    productos = dataProducts.slice(0)

    socket.emit('productos',  productos)

    socket.on('newproduct', async data => {
        
        let producto = await productmanager.createProduct(data)
        productos.push(producto)
        socket.emit('producto', productos)
    })

    socket.on('id', async data => {
        await productmanager.deleteProduct(data)
        let indexProduct =  productos.findIndex(el => el.id === data)
        productos.splice(indexProduct, 1)
        socket.emit('productosDelete', productos)
    })

    

})