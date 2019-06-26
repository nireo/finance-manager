// import needed dependencies
const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    uniqueValidator = require("mongoose-unique-validator")


// define schema
const ExpenseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        required: true
    },
    // reference to user since we don't want others seeing
    // some random users expenses :)
    byUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // use this just to define if expense is a source of money or use of money
    profit: {
        type: Boolean,
        required: true
    },
    time: String
})

ExpenseSchema.plugin(uniqueValidator)

//export schema
module.exports = mongoose.model("Expense", ExpenseSchema)