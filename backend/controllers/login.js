const jwt = require("jsonwebtoken")
const express = require("express"),
    router = express.Router()
const bcrypt = require("bcrypt")
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

router.post("/", async (req, res) => {
    // shorten code
    const body = req.body

    // find the specified user by the username
    const user = await User.findOne({ username: body.username})

    // first check if there is a user by the username 
    // if thats true compare if the passwords match
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)
    
    // send HTTP status 401 if the credentials are incorrect
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: "invalid username or password"
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    console.log(`${user.name} logged in | token: ${token}`)

    res.status(200)
        .send({ token, username: user.username, name: user.name})
    
})

module.exports = router