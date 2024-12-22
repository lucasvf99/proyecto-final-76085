//model 
import productsModel from './models/products.js'
//service

async function sortAsc   (filter) {
    let sortAsc = await productsModel.aggregate([
                {
                    $match:{ category: filter}
                },

                {
                    $sort:{price: -1}
                }
            ])
    // console.log(sortAsc)
    return sortAsc
}
async function sortDes   (filter) {
    let sortDes = await productsModel.aggregate([
                {
                    $match:{ category: filter}
                },

                {
                    $sort:{price: 1}
                }
            ])
    
    // console.log(sortDes)
    return sortDes
}


export default class ProductsManager {


    //obt productos paginate
    async getAll (limit, page, filter,sort){

        let products  = await productsModel.paginate({}, {limit: limit, page: page, lean: true})
        // console.log(products)
        products.prevLink= products.hasPrevPage ? `http://localhost:8085/viewProducts?page=${products.prevPage}&limit=${limit}&category=${filter}` : ''
        products.nextLink= products.hasNextPage ? `http://localhost:8085/viewProducts?page=${products.nextPage}&limit=${limit}&category=${filter}` : '' 
        products.homeLink = `http://localhost:8085/viewProducts`
        //category
        let productsFilter 
        if(filter){
            productsFilter  = await productsModel.paginate({category: filter}, {limit: limit, page: page, lean: true}) 
            productsFilter.prevLink= products.hasPrevPage ? `http://localhost:8085/viewProducts?page=${products.prevPage}&limit=${limit}&category=${filter}` : ''
            productsFilter.nextLink= products.hasNextPage ? `http://localhost:8085/viewProducts?page=${products.nextPage}&limit=${limit}&category=${filter}` : '' 

                 
            productsFilter.homeLink = `http://localhost:8085/viewProducts`
            console.log(productsFilter)
            products = productsFilter
        }
        if(sort== 'asc'){
            productsFilter.docs = await sortAsc(filter)
            productsFilter.hasNextPage= false
        }else if (sort=='des'){
             productsFilter.docs = await sortDes(filter)
            productsFilter.hasNextPage= false

        }

     
        products.isValid = !(page <= 0 || page > products.totalPages)
        console.log(products)
        return products
    }

    async create (product){

        let producto = await productsModel.create (product )
        
        return producto
    }

    async delete (pId){
        // let product = await productsModel.find({_id:pId})
        await productsModel.deleteOne({_id:pId})

    }

}

