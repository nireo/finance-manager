// import needed modules
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const config = require("./utils/config")
const userRouter = require("./controllers/users")
const app = express()

// display message
console.log("connecting to mongodb")
mongoose.connect(config.MONGO_URI, {useNewUrlParser: true})
    .then(() => {
        // successfully connected
        console.log("connected to mongodb")
    })
    .catch(e => {
        // error happens
        console.log("something went wrong", e)
    })

// make app use Cross-origin resource sharing
app.use(cors())

// define user router
app.use("/users", userRouter)

// add a listener on port specified by config
app.listen(() => {
    console.log(`server runnig on port ${config.PORT}`)
})