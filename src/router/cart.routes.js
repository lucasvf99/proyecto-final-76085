import { Router } from "express";
import CartManager from '../services/cartManager.js'


const cartManager = new CartManager()

const router = Router()

//listo
router.get('/', async (req,res)=>{

    try {
        
        let cart = await cartManager.getCart()

        res.send(cart)
    } catch (error) {
        console.log(error)
    }
})

//hacer funcionar handlebars
router.get('/:cid', async (req,res)=>{

    try {
        //obtener el id del carrito y traerlo, mostrarlos productos de dicho carrito
        let cId = req.params.cid
        let populateCart = await cartManager.getCartId(cId)

        //para postman
        // res.send(populateCart)

        //handlebars
        res.render( 'cart', {products: populateCart})
    } catch (error) {
        console.log(error)
    }
})


//listo
router.post('/', async (req,res)=> {

    try {
    let cart = await cartManager.create()
    res.send({cart: cart})
        
    } catch (error) {
        console.log(error);
        
    }

})

//agregar producto al carrito / listo
router.post('/:cId/product/:pId', async (req,res)=>{
    try {
        let cId = req.params.cId
        let pId = req.params.pId
        let carrito = await cartManager.addProduct(cId, pId)

        res.send({status:'success', payload:carrito})
      
    } catch (error) {
        console.log(error)
    }
})

//por postman solo el id del producto en obj /listo
router.put('/:cId', async (req,res)=>{

    let cId = req.params.cId
    let newData = req.body

    let carritoUpDate = await cartManager.upDate(cId, newData)
  
    res.send({status: 'success', carrito: carritoUpDate})

})
 
//actualizar solo la cantidad del producto / listo
//pasar por postman {quantity: valor}
router.put('/:cId/products/:pId', async (req,res)=>{
    let cId = req.params.cId
    let pId = req.params.pId
    let {quantity} = req.body

    let product = await cartManager.upDateQuantity(cId, pId, quantity)

    res.send(product)
})

//api/carts/:cid debe eliminar un producto/ listo
router.delete('/:cId/product/:pId', async (req,res)=>{

    let cId = req.params.cId
    let pId = req.params.pId

    const cartDelete = await cartManager.delete(cId, pId)

    res.send({status:'success', payload: cartDelete})
})

//elimnar todos los productos/listo
router.delete('/:cId', async (req,res)=>{

    let cId = req.params.cId

    const cartDelete = await cartManager.deleteAll(cId)

    res.send({status:'success', payload: cartDelete})
})



export default router

