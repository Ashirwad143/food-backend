const express=require("express")
const dotenv=require("dotenv").config()
const cors=require("cors")
const connectDb=require("./config/connectionDb")


const app=express()
app.use(cors(
    {
        origin:"*",credentials:true
    }
));
app.use(express.static("public"))
const PORT=process.env.PORT || 3000

connectDb()
app.use(express.json())
app.use("/",require("./routes/user"))
app.use("/recipe",require("./routes/recipe"))

app.listen(PORT,(err)=>{
    console.log(`app is runningon port ${PORT}` )
})