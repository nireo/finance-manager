// import needed dependencies
const mongoose = require("mongoose"),
    Schema = mongoose.Schema

// define schema
const ExpenseSchema = new Schema({
    title: String,
    value: Number,
    // reference to user since we don't want others seeing
    // some random users expenses :)
    byUser: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    // use this just to define if expense is a source of money or use of money
    profit: Boolean
})

//export schema
module.exports = mongoose.model("Expense", ExpenseSchema)