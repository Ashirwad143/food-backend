const mongoose=require("mongoose")
const connectDb=async ()=>{
    await mongoose.connect(process.env.CONNECTION)
    .then(()=> console.log("connected"))
}


module.exports=connectDb