const express = require("express"),
    router = express.Router(),
    Expenses = require("../models/expense")

router.get("/", async (req, res) => {
    try {
        const expenses = await Expenses.find({})
        res.json(expenses.map(expense => expense.toJSON()))
    } catch (e) {
        console.log(e)
    }
})

module.exports = router