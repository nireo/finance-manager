const mongoose = require("mongoose"),
    Schema = mongoose.Schema

const reminderSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    inExpense: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Expense'
    },
})

module.exports = mongoose.model('Reminder', reminderSchema)