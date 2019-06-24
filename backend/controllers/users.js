const userRouter = require("express").Router()

userRouter.get("/", (req, response) => {
    response.send("hello")
})

module.exports = userRouter