import express from 'express'
import __dirname from './utils.js'
//motor de plantilla + dinamismo
import handlebars from 'express-handlebars' 
//router
import viewRoutes from './router/views.routes.js'
import productsRoutes from './router/products.routes.js'
import cartRoutes from './router/cart.routes.js'
//mongoose
import mongoose from 'mongoose'

const app = express()
const PORT = 8085

//config
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//motor hdb
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


//public
app.use(express.static( __dirname + '/public'))


app.use('/products', productsRoutes)
app.use('/cart', cartRoutes)
app.use('/viewproducts', viewRoutes)




const httpServer = app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})

const DBPATH = "mongodb+srv://lucasvf4379:FwKkhXrPcqUrKIoR@cluster0.xsqug.mongodb.net/Entrega-final?retryWrites=true&w=majority&appName=Cluster0"

const connectMongoDb = async () => {
    try {
        
        await mongoose.connect(DBPATH)
        console.log('Conectado a Mongo')


    } catch (error) {
        console.log('No se pudo conectar a Mongo')
    }
}

connectMongoDb ()