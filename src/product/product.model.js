import { Schema, model } from "mongoose";

const productSchema = Schema({
    productName:{
        type: String,
        required: [true, "Name of the product is needed."]
    },
    productCategory:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    productDescription:{
        type: String,
        required: [true, "Description of the product is needed."]
    },
    productSales:{
        type: Number,
        default: 0
    },
    productPrice:{
        type: Number,
        required: [true, "Price of the product is needed."]
    },
    productStock:{
        type: Number,
        required: [true, "Stock of the product is needed."]
    },
    Status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Product", productSchema)