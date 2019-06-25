// import needed modules
const express = require("express")
router = express.Router()
const jwt = require("jsonwebtoken")

// import user model
const User = require("../models/user")

// some middleware
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
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
        console.log(e)
        next()
    }
})

// post route for adding users
router.post("/", async (req, res) => {
    // create a new time object
    const time = new Date()
    const body = req.body
    const testUser = new User({
        name: body.name,
        username: body.username,
        passwordHash: body.passwordHash,
        monthlySalary: body.monthlySalary,
        registerationDate: `${time}`,
        expenses: []
    })
    // save user 
    const savedUser = await testUser.save()
    //return saved user data in JSON
    res.json(savedUser.toJSON())
})

// export routes
module.exports = router