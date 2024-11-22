const socket = io()

let input = document.querySelector('#textoEntrada')
let log = document.querySelector('#log')


input.addEventListener('keyup', evt => {
    if(evt.key === 'Enter'){
        socket.emit('mensajeI', input.value)
        input.value = ''
    }
})

socket.on('respuesta', data => {
    console.log(data)
    let logs = ''
    data.msjs.forEach(log => {
        logs += `${log.socketId} dice ${log.message} <br/>`
    });

    log.innerHTML = logs
})