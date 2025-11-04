import mongoose from "mongoose";
 const userSchema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'

    }
 })
 const userModel=mongoose.model('user',userSchema)
 export default userModel