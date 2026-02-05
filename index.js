const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const connectDb = require("./config/connectionDb")

const app = express()

app.use(cors({
  origin: "*",
  credentials: true
}))

app.use(express.static("public"))
app.use(express.json())

// ✅ ROOT ROUTE ADD
app.get("/", (req, res) => {
  res.send("Food Recipe API running 🚀")
})

const PORT = process.env.PORT || 3000

connectDb()

app.use("/", require("./routes/user"))
app.use("/recipe", require("./routes/recipe"))

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})
