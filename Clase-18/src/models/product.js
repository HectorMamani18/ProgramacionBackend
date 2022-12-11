import { Mongoose } from "mongoose";



 export const productsCollection = "Products"

const productsSchema = new Mongoose.Schema({
    id: {type: Number, required : true},
    name: {type: String, required : true},
    price:{type:Number,required:true},
    Stock : {type:String, required: true}
});
export const ProductsModel = Mongoose.model(productsCollection,productsSchema)

module.exports = {ProductsModel};
