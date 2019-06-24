require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const config = require("./utils/config")
const userRouter = require("./controllers/users")
const app = express()

console.log(process.env.PORT)


console.log("connecting to mongodb")
mongoose.connect(config.MONGO_URI, {useNewUrlParser: true})
    .then(() => {
        // successfully connected
        console.log("connected to mongodb")
    })
    .catch(e => {
        console.log("something went wrong", e)
    })

app.use(cors())
app.use("/users", userRouter)

app.listen(() => {
    console.log(`server runnig on port ${config.PORT}`)
})