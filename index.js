const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const authRoute  = require("./routes/auth.js")
const hotelsRoute  = require("./routes/hotelsRoute.js")
const roomRoute  = require("./routes/roomRoute.js")
const userRoute  = require("./routes/userRoute.js")
const cookieParser = require("cookie-parser")
const cors = require("cors")


const app = express()
dotenv.config()
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to mongoDB")
    } catch (error) {
        throw error
    }
}
mongoose.connection.on("disconnected", ()=>{
    console.log("disconnected MongoDB")
})
// mongoose.connection.on("connected", ()=>{
//     console.log("connected MongoDB")
// })

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomRoute)


// ERR handler middleware
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        message: errorMessage,
        success: false,
        status: errorStatus,
        stack: err.stack
    })
})


const PORT = process.env.PORT || 8800

// routes
// app.get("/", (req,res)=>{
//     res.send("hello")
// })


app.listen(8800, ()=> {
    connectDB()
    console.log("Server Started at PORT 8800")
})