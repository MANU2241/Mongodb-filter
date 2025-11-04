import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb+srv://manu:AhwgBqwh8HyTFPly@cluster0.r7jbx.mongodb.net/myDB')
        console.log('connected to database .....')
    }
    catch(error){
        console.log(`${error}`)
    }
}
export default connectDB