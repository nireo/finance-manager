// import needed dependencies
const mongoose = require("mongoose"),
    Schema = mongoose.Schema

// define schema
const ExpenseSchema = new Schema({
    title: String,
    value: Number,
    byUser = {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    profit: Boolean
})

//export schema
module.exports = mongoose.model("Expense", ExpenseSchema)