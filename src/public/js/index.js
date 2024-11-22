// creamos para conexion con socket

const socket = io() //referencia a la libreria

//msj hacia el servidor
socket.emit("mensaje", "hola soy el cliente") // (key,data)

//escuchar msj del index.js 
socket.on('mensaje', data => {
    console.log("Recibido " + data)
})

socket.on("broadcast", data =>{
    console.log("Recibido" + data)
})

socket.on("eventoParaTodos", data => {
    console.log(data)
})