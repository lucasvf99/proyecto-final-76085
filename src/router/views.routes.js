import { Router } from "express";
import ProductsManager from "../services/productsManager.js";


const router = Router()
const productsManager = new ProductsManager()

router.get('/', async (req,res)=>{

    try {
        await productsManager.init()
        const products = await productsManager.getProducts()
        res.render('home',{products:products}) // reenderiza la carpeta home.hanldebars
    } catch (error) {
        console.log(error)
    }
})

router.get('/realtimeproducts', async (req,res)=>{
    res.render('realTime')
})

export default router

