const jwt = require("jsonwebtoken")
const express = require("express"),
    router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

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