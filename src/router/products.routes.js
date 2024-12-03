import { Router } from "express";
import ProductsManager from "../services/productsManager.js";

const productManager = new  ProductsManager()


const router = Router()


router.get('/:limit', async (req,res) => {
    try {   
        const limit = req.params.limit ? parseInt(req.query.limit) : undefined
        const products = await productManager.getProducts(limit)

        res.json(products)
        
    } catch (error) {
        console.log(error)
    }
})


router.post('/', async (req,res) => {

    const dataProduct = req.body
    const product = await productManager.createProduct(dataProduct)

    res.send({status:'succes', producto: product})
})


router.put('/:pid', async (req, res)=>{

    let productId = req.params.pid
    let productoAc = await productManager.updateProduct(productId, req.body)
    
    res.send({product: productoAc})
} )


router.delete('/:pid', async (req, res) => {
    let productId = req.params.pid
    let productDel = await productManager.deleteProduct(productId)

    res.send(productDel)
})

export default router