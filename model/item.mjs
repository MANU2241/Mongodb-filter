import mongoose from "mongoose";
 const itemSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
 })
 const itemModel=mongoose.model('items',itemSchema)
 export default itemModel