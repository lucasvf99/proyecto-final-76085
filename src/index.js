/**
    

            ------------- ACORDARSE ---------------    

    on => para escuchar
    emit => para enviar

        ---------------------------------------------
 */

import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
//socket
import {Server} from 'socket.io'
//router
import viewRouter from './routes/views.routes.js'

const app = express()
const PORT = 9090

//middlewares de confg
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//motor hdb
app.engine('handlebars', handlebars.engine())

//carpeta views
app.set('views', __dirname + '/views')

//indicamos motor
app.set('view engine', 'handlebars')

//public
app.use(express.static(__dirname + '/public'))


app.get('/ping', (req, res)=>{
    res.render('index', {})
})


const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

//instanciamos socket.io

const socketServer = new Server(httpServer)

//array del ejercicio

const msjs = []

//configuramos handshake
//creamos canal de comunicacion hacia el cliente
//para escuchar los msj tenemos on 
//para emitir un msj emit
socketServer.on('connection', socket => { //(key, data)

    //TODO LO QUE SEA SOCKET !!

    //recibir msj de public/index.js
    socket.on("mensaje", data =>{
        console.log("Recibido: " + data)
        //envio mensaje al cliente
        socketServer.emit("mensaje", "Hola soy el server")
    })

    //broadcast
    //el msg se propaga para todos los socket que esten conectados
    //menos para el que lo envia
    socket.broadcast.emit("broadcast", "Este evento es para todos los sockets, menos para el socket que lo envia")

    //comunicacion en todas las direcciones
    socketServer.emit("eventoParaTodos", "Evento para todos")

   
    /* EJERCICIO */
    socket.on('mensajeI', data =>{
        console.log('Recibido ' + data)
        msjs.push({socketId: socket.id, message:data})
    })

    socketServer.emit('respuesta', {msjs} )
    


})


//llamo al router
app.get('/message', viewRouter) 


