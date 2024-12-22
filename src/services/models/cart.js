import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const collectionName = 'carts'

const stringType = {
    type: String,
    require: true
}
const numberType =  {
    type: Number,
    require: true
}

const cartSchema = new mongoose.Schema({
     
        products: {
            type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type:  Number,
                    default : 1
                }
            }
            ],
            default: []
        }

})

cartSchema.plugin(mongoosePaginate)
const cartModel = mongoose.model(collectionName, cartSchema)

export default cartModel