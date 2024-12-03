import fs from 'fs/promises' // trbajamos con promesas
import path from 'path'
// id
import {v4 as uuidv4} from 'uuid'

//crear archivo 

//buscar archivo                 ( carpeta ,   archivo    )
const fileProducts = path.resolve('data', 'products.json') 

export default class ProductsManager {

    constructor (){
        this.products = []
        this.init()
    }

    async init (){    
        try{
                    //( archivo    , descodificar)
            const data = await fs.readFile(fileProducts, 'utf-8')
            this.products = JSON.parse(data)//agregar data
        }
        catch(error){
            console.log(error)
            this.products = []
        } 
    }

    //refrescar archivos 
    async saveFile (){
        const dataJson = JSON.stringify(this.products, null, 2)
        await fs.writeFile(fileProducts, dataJson)
    }

    //obt productos 
    async getProducts (){
            this.init()
            return this.products
    }
    

    //crear producto
    async createProduct (product){
        const newProduct =  {
            id: uuidv4(),
            ...product,
            status: true
        }
        this.products.push(newProduct)

        
        this.saveFile()

        return newProduct
    }

    async updateProduct (id, updateProduct){
        let index = this.products.findIndex(el => el.id === id)

        let nuevoProducto = {
            id: this.products[index].id,
            ...updateProduct,
        }
        console.log(nuevoProducto)

        this.products[index] = nuevoProducto

        this.saveFile()

        return nuevoProducto
    }

    async deleteProduct (id) {
        let index = this.products.findIndex(el => el.id === id)
        console.log(index)
        this.products.splice(index, 1)

        this.saveFile()

        return this.products
    }

}

