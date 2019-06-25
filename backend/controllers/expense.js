const express = require("express"),
    router = express.Router(),
    Expenses = require("../models/expense")

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
    try {
        const expenses = await Expenses.find({})
        res.json(expenses.map(expense => expense.toJSON()))
    } catch (e) {
        console.error(e)
    }
})

router.post("/", async (req, res, next) => {
    try {
        // create a new time object
        const time = new Date()
        //clean up code
        const body = req.body
    } catch (e) {
        next(e)
    }
})

module.exports = router