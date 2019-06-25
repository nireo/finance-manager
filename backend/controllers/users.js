// import needed modules
const express = require("express")
router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

// import user model
const User = require("../models/user")

// some basic middleware
router.use(function timeLog (req, res, next) {
    const time = new Date
    // time of request
    console.log("Time: ", time)
    // what method e.g. POST, GET; PUT, DELETE
    console.log("Request Type:", req.method)
    // see which url the request goes to
    console.log("Request URL:", req.originalUrl)
    next()
})

// middleware for errors
router.use((err, req, res, next) => {
    console.error(err.stack)
    // send a json error message
    res.status(500).json({error: 'something went wrong'})
})

// get route for getting users
router.get("/", async (req, res, next) => {
    try {
        // get all users
        const users = await User.find({})
        // send response which includes all the users in json
        res.json(users.map(user => user.toJSON()))
    } catch (e) {
        // if anything goes wrong
        console.error(e)
        next()
    }
})

// post route for adding users
router.post("/", async (req, res, next) => {
    // try to run code without errors
    try {
        // create a new time object
        const time = new Date()
        // clean up code by not having to type e.g. req.body.name
        const body = req.body

        const salt = 10
        const passwordHash = await bcrypt.hash(body.password, salt)

        const user = new User({
            name: body.name,
            username: body.username,
            passwordHash,
            monthlySalary: 0,
            registerationDate: `${time}`,
            expenses: []
        })
        // save user 
        const savedUser = await user.save()
        //return saved user data in JSON
        res.json(savedUser)
    } catch (e) {
        // if a error occurs
        next(e)
    }

})

// export routes
module.exports = router