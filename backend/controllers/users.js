// import needed modules
const express = require("express")
router = express.Router()
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
    // since it's pointless to log GET requests since the don't have data
    if (req.method === "POST") {
        console.log(req.body)
    }
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
        const users = await User.find({}).populate('expenses')
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

        // hash the password
        const salt = 10
        const passwordHash = await bcrypt.hash(body.password, salt)

        // new user object which is saved to db
        const user = new User({
            name: body.name,
            username: body.username,
            passwordHash,
            monthlySalary: 0,
            registerationDate: `${time.getHours()}:${time.getMinutes()} ${time.getDate()} ${time.getMonth()} ${time.getFullYear()}`,
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