import cartModel from './models/cart.js'
import productsModel from './models/products.js'

export default class CartManager {

    async create (data){
        let carrito = await cartModel.create (data)
        return carrito
    }

    async getCart(){
        let cart = await cartModel.find().populate('products.product')

        return cart
    }

    //hacer funcionar handlebars
    async getCartId(cId){
        
        let populateCart = await cartModel.find().populate({
            path:'products.product',
            select: 'title price stock category quantity description thumbnails',
        }).lean()
        
        let cart = populateCart.find(el => el._id == cId)
        

        let products =  cart.products.map(el => ({
            ...el.product,
            quantity: el.quantity,
        }))

       console.log(products)
    

        return products
    }

    async addProduct (cId, pId){
        let cart = await cartModel.findOne({_id:cId})
        

            if(cart.products.find(el => el.product == pId)){
                console.log('duplicado')
                let index = cart.products.findIndex(el => el.product == pId)
                let cartDuplicate = cart.products.find(el => el.product == pId)
                cartDuplicate.quantity ++
                cart.products[index] = cartDuplicate
            }else{
                cart.products.push({product:pId, quantity: 1})
            }

        await cartModel.updateOne({_id:cId}, cart)
        
    }
            
    async delete (cId, pId){

        let cart = await cartModel.findOne({_id: cId})

        let indiceProduct = cart.products.findIndex(el => el.product._id == pId)

        
        if(cart.products[indiceProduct].quantity > 1){
            cart.products[indiceProduct].quantity --
        }else{
            cart.products.splice(indiceProduct, 1)
        }
        await cartModel.updateOne({_id:cId}, cart)

        return cart

        // return newCart
    }

    async upDate (cId,data){

        let carrito = await cartModel.findOne({_id:cId})
        carrito.products = data

        await cartModel.updateOne({_id:cId}, carrito)

        return carrito
    }

    async upDateQuantity (cId, pId , quantity) {

        let carrito = await cartModel.findOne({_id: cId})
      
        let product = carrito.products.find(el => el.product == pId)
        let index = carrito.products.findIndex(el => el.product == pId)
       
        product.quantity= quantity
        carrito.products[index] = product

        await cartModel.updateOne({_id:cId}, carrito)
        
        return carrito

    }
    
    async deleteAll (cId){
        let carrito = await cartModel.findOne({_id: cId})
        carrito.products = []
        await cartModel.updateOne({_id: cId}, carrito)
        return carrito
    }
}