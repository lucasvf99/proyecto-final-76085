const socket = io()

let user ;
const formulario = document.getElementById('formulario')
const campos = document.getElementsByClassName('campo__field')
const main = document.getElementById('main')

function productCreate (el) {
 
    main.innerHTML += `
        <div class="items" id=${el.id}>
            <button class='boton-delete boton'>X</button>
            <div class="img-real">
                <img src= ${el.thumbnails}></img>
            </div>
            <div>
                <p>Title: ${el.title}</p>
                <p>Price: ${el.price}</p>
                <p>Description: ${el.description}</p>
                <p>Category: ${el.category}</p>
                <p>Stock: ${el.description}</p>
            </div>
        </div>`
    

    const botonHtmlC = document.getElementsByClassName('boton-delete')
    const botones = Array.from(botonHtmlC)
    botones.forEach(el => el.addEventListener('click', (el)=>{
        let id = el.target.parentElement.id
        socket.emit('id', id)
        socket.on('productosDelete', data =>{
            main.innerHTML= ''
            data.forEach(el=> 
                productCreate(el)
             )
        })
    }))
}

socket.on('productos', data =>{
    main.innerHTML= ''
    data.forEach(el=> 
        productCreate(el)
     )
})

formulario.addEventListener('submit', async (e)  => {
    e.preventDefault()
    const title = e.target[0].value 
    const price =  e.target[1].value 
    const description =  e.target[2].value 
    const image =  e.target[3].value 
    const category =  e.target[4].value 
    const stock =  e.target[5].value 

    let arrayCampos = Array.from(campos)
    arrayCampos.forEach(e => e.value = '');

    if(!title || !price || !description || !image || !category || !stock){
       return
    }

    const producto = {
        title: title,
        price: price,
        description: description,
        thumbnails: image,
        category: category,
        stock: stock
    }
  
    productoCreado()
    socket.emit('newproduct', producto)
    socket.on('producto', data => {
        main.innerHTML= ''
        data.forEach(el=> 
           productCreate(el)
        )
    })


})
function productoCreado (){
    Swal.fire({
        title: "Producto creado ...",
        icon: "success"
      });
}




Swal.fire({
    icon: "info",
    title: "Identicate, por favor",
    input: "text",
    text: "Ingrese el username",
    color: "#716add",

    inputValidator:(value) => {
        if(!value){
            return "Debes ingresar un user name"
        }else{
            socket.emit('userConnected',{user: value})
        }

    },
// permitir hacer click afuera del modal
    allowOutsideClick: false
}).then(result => {// hasta que no se ejecute lo de arriba no se hace esto 

    user = result.value

    // cargamos el valor a la plantilla 
    document.getElementById("myName").innerText = user
})






