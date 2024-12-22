import { Router } from "express";
import ProductsManager from "../services/productsManager.js";

const productManager = new  ProductsManager()


const router = Router()


router.get('/', async (req,res) => {
    try {   
   
        let limit = parseInt(req.query.limit ) || 5
        let page = parseInt(req.query.page ) || 1
        let category = req.query.category || ''
        

        const products = await productManager.getAll(limit , page, category )

        res.send( {
            status:'succes', 
            payload: products,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.prevLink,
            nextLink: products.nextLink
        })
        
    } catch (error) {
        console.log(error)
    }
})



router.post('/', async (req,res) => {
    let dataProduct = req.body

    let product = await productManager.create(dataProduct)

    res.send(product)
})


router.put('/:pid', async (req, res)=>{

    let productId = req.params.pid
    let productoAc = await productManager.updateProduct(productId, req.body)
    
    res.send({product: productoAc})
} )


router.delete('/:pid', async (req, res) => {
    let productId = req.params.pid
    let productDel = await productManager.delete(productId)

    res.send('success')
})

export default router