const express = require("express"),
    router = express.Router(),
    Expenses = require("../models/expense"),
    jwt = require("jsonwebtoken"),
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
    console.error(err.name)
    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' })
    }
    // send a json error message
    res.status(500).json({error: 'something went wrong'})
})

router.get("/", async (req, res, next) => {
    const token = getTokenFrom(req)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({error: 'you need a token to get expenses'})
        }

        const user = await User.findById(decodedToken.id)
        const allExpenses = await Expenses.find({byUser: user._id}).populate('user')
        res.json(allExpenses.map(expense => expense.toJSON()))
    } catch (e) {
        // if something goes wrong
        res.status(401).json({error: 'you need a token to get expenses'})
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
            byUser: user._id,
            color: body.color
        })

        const savedExpense = await expense.save()
        user.expenses = user.expenses.concat(savedExpense._id)
        await user.save()
        res.json(savedExpense.toJSON())
    } catch (e) {
        next(e)
    }
})


// put request for change money value
router.put("/:id", async (req, res, next) => {
    // clean up code
    const body = req.body
    const token = getTokenFrom(req)
    try {
        // use jsonwebtoken to verify the token
        const decodedToken = jwt.verify(token, process.env.SECRET)
        // if they aren't defined or defined to null
        if (!token || !decodedToken.id) {
            // respond with error message
            return res.status(401).json({
                 error: 'token missing or invalid'
            })
        }
    
        // change the value to the request value
        const newExpense = {...expense, value: body.value  }
        const changedExpense = await Expenses.findByIdAndUpdate(req.params.id, newExpense, { new: true })
        res.json(changedExpense.toJSON())
    } catch (e) {
        next(e)
    }
})

router.delete("/:id", async (req, res, next) => {
    const token = getTokenFrom(req)
    try {
        // same as above
        const decodedToken = jwt.verify(token, process.env.SECRET)
        // get the specific expense first since we could call .findByIdAndDelete(),
        // but it will check for the user first
        const expense = await Expenses.findById(req.params.id)
        if (expense.byUser.toString() === decodedToken.id) {
            await Expenses.findByIdAndRemove(expense._id )
        } else {
            return res.status(401).json({
                error: 'token missing or invalid'
            })
        }
    } catch (e) {
        next(e)
    }
})

// the reminder route 
router.post("/:id/reminders", async (req, res, next) => {
    const token = getTokenFrom(req)
    // define the reminder from body for cleaner code
    const { reminder } = req.body
    // give a status 400 no content if the post request doesn't include a reminder
    if (!reminder) {
        return res.status(400).json({ error: 'no content, or wrong content'})
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid'})
        }
        // find the expense that gets a reminder
        const expense = await Expenses.findById(req.params.id)
        // add new reminder to the reminder list
        expense.reminders = expense.reminders.concat(reminder)
        // after that save the expense with the reminder
        const withReminder = await expense.save()
        // return the new expense the program saved
        res.json(withReminder.toJSON())
    } catch (e) {
        next(e)
    }
})

module.exports = router