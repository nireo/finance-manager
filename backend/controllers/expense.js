const express = require("express"),
    router = express.Router(),
    Expenses = require("../models/expense"),
    jwt = require("jsonwebtoken")
    User = require("../models/user")

const getTokenFrom = request => {
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7)
    }
    return null
}

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

router.get("/", async (req, res) => {
    const token = getTokenFrom(req)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({error: 'you need a token to get expenses'})
        }

        const user = await User.findById(decodedToken.id)
        const allExpenses = await Expenses.find({byUser: user._id}).populate('user')
        console.log(allExpenses)
        res.json(allExpenses.map(expense => expense.toJSON()))
    } catch (e) {
        // if something goes wrong
        console.error(e)
    }
})

router.post("/", async (req, res, next) => {
    // create a new time object
    const time = new Date()
    //clean up code
    const body = req.body
    // get the token and run it through the extraction function
    const token = getTokenFrom(req)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid'})
        }

        const user = await User.findById(decodedToken.id)

        const expense = new Expenses({
            title: body.title,
            value: body.value,
            time: `${time.getHours()}:${time.getMinutes()} ${time.getDate()} ${time.getMonth()} ${time.getFullYear()}`,
            profit: body.profit,
            byUser: user._id
        })

        const savedExpense = await expense.save()
        user.expenses = user.expenses.concat(savedExpense._id)
        await user.save()
        res.json(savedExpense.toJSON())
    } catch (e) {
        next(e)
    }
})

module.exports = router