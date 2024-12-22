import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const collectionName = 'products'

const stringType = {
    type: String,
    require: true
}
const numberType =  {
    type: Number,
    require: true
}

const productsSchema = mongoose.Schema({
        title: stringType,
        price: numberType,
        description: stringType,
        thumbnails: stringType,
        category: stringType,
        stock: numberType,

})

productsSchema.plugin(mongoosePaginate)
const productsModel = mongoose.model(collectionName, productsSchema)

export default productsModel