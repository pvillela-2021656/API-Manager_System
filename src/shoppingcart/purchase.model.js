import { Schema, model } from "mongoose";

const purchaseSchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product:[{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        amount:{
            type: Number,
            required: true
        }
    }],
    status:{
        type: String,
        enum: ["PEND", "DONE"],
        default: "ON_CART"
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Purchase", purchaseSchema)