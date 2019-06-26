// import needed modules
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const config = require("./utils/config")
const userRouter = require("./controllers/users")
const app = express()
const expenseRouter = require("./controllers/expense")
const loginRouter = require("./controllers/login")

// display message
console.log("connecting to mongodb")
mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})
    .then(() => {
        // successfully connected
        console.log("connected to mongodb")
    })
    .catch(e => {
        // error happens
        console.log("something went wrong", e)
    })

// make app use bodyParser
app.use(bodyParser.json())

// make app use Cross-origin resource sharing
app.use(cors())

// define other routers
app.use("/users", userRouter)
app.use("/expenses", expenseRouter)
app.use("/login", loginRouter)

module.exports = app