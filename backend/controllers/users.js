// import needed modules
const express = require("express"),
    router = express.Router(),
    bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken")

// implementing this because i want 
const getTokenFrom = request => {
    // get the authorization request
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        // take the bearer out of the string
        return authorization.substring(7)
    }
    // if the is no authorization or the authorization doesn't start with 'bearer'
    return null
}

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
    // applying token to this aswell since the only person I want to see all users
    // is the admin user
    const token = getTokenFrom(req)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({error: 'you need a token to get expenses'})
        }
        const user = await User.findById(decodedToken.id)
        if (user) {
            // get all users
            const populatedUser = await User.find({username: user.username}).populate('expenses')

            // send response which includes all the users in json
            res.json(populatedUser)
        } else {
            return res.status(401).json({ error: 'user not found or invalid token'}) 
        }
    } catch (e) {
        // if anything goes wrong
        next(e)
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
            // monthly salary will be controlled from the frontend
            monthlySalary: 0,
            registerationDate: 
            `${time.getHours()}:${time.getMinutes()} ${time.getDate()}.${time.getMonth() + 1}.${time.getFullYear()}`,
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

// route for updating name
router.put("/:id/name", async (req, res, next) => {
    const { name } = req.body
    const token = getTokenFrom(req)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET) 
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        const userToChange = await User.find({ _id: req.params.id })
        // make the object with the new name
        const updatedUser = {...userToChange, name: name }
        // update the user
        const saveUser = await User.findByIdAndUpdate(req.params.id, updatedUser, { new: true })
        res.json(saveUser.toJSON())
    } catch (e) {
        next(e)
    }
})

router.put("/:id/username", async (req, res, next) => {
    const { username } = req.body
    const token = getTokenFrom(req)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.td) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        const userToChange = await User.find({ _id: req.params.id })
        const saveUser = await User.findByIdAndUpdate(req.params.id, {...userToChange, username: username}, { new: true })
        res.json(saveUser.json())
    } catch (e) {
        next(e)
    }
})

// export routes
module.exports = router