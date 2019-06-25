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
router.get("/", (req, response) => {
    response.json({test: true}.toJSON())
})

// post route for adding users
router.post("/", async (request, response) => {
    const time = new Date()
    const body = request.body
    const testUser = new User({
        name: body.name,
        username: body.username,
        passwordHash: body.passwordHash,
        monthlySalary: body.monthlySalary,
        registerationDate: `${time}`,
        expenses: []
    })
    const savedUser = await testUser.save()
    response.json(savedUser.toJSON())
})

// export routes
module.exports = router