import { Router } from "express";
import ProductsManager from '../services/productsManager.js';


const router = Router()
const productsManager = new ProductsManager()

router.get('/', async (req,res)=>{

    try {

        let limit = parseInt(req.query.limit ) || 5
        let page = parseInt(req.query.page ) || 1
        let category = req.query.category || ''
        let sort = req.query.sort || ''
        
        const products = await productsManager.getAll(limit , page, category, sort )
       
        // console.log(products)
        res.render('home', products)
    } catch (error) {
        console.log(error)
    }
})


export default router

